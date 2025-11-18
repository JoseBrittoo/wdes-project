import { useEffect, useState } from "react";
import { getCourseSubjects } from "../../../lib/supabaseQueries";
import { CurriculumGrid } from "./../components/curriculum-grid";
import { GraduationCap } from "lucide-react";
import { supabase } from "../../../lib/supabase";

import type { Course, Subject } from "../../../modules/grade/types/curriculum";

export default function GradeCurricularPage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserCourse() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        const { data: userData } = await supabase
          .from("profiles")
          .select("course_id, courses(id, name, coordinator)")
          .eq("id", user.id)
          .single();

        if (userData?.courses) {
          const courseData = Array.isArray(userData.courses)
            ? userData.courses[0]
            : userData.courses;
          setCourse({
            id: courseData.id,
            name: courseData.name,
            coordinator: courseData.coordinator,
          });

          // Buscar disciplinas do curso
          const subjectsData = await getCourseSubjects(courseData.id);
          setSubjects(subjectsData);
        }
      } catch (error) {
        console.error("Erro ao buscar curso do usuário:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserCourse();
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Carregando...</div>;
  }

  if (!course) {
    return (
        <div className="text-center py-12 text-gray-500">
          Nenhum curso vinculado ao seu usuário.
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Grade Curricular</h1>
        </div>
        <p className="text-muted-foreground text-lg mb-4">
          Disciplinas do curso: {course.name}
        </p>
      

      {subjects.length > 0 ? (
        <CurriculumGrid
          course={{
            id: course.id,
            name: course.name,
            subjects: subjects,
            coordinator: course.coordinator,
          }}
        />
      ) : (
        <p className="text-gray-500 text-center mt-8">
          Nenhuma disciplina encontrada para este curso.
        </p>
      )}
      </div>
    </div>
  );
}
