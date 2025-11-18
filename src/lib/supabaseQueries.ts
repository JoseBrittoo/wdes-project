import { supabase } from "./supabase";

export async function getCourses() {
  const { data, error } = await supabase.from("courses").select("*");
  if (error) {
    console.error("Erro ao buscar cursos:", error);
    return [];
  }
  return data;
}

export async function getCourseSubjects(courseId: number) {
  const { data, error } = await supabase
    .from("course_subjects")
    .select(
      `
      semester,
      prerequisites,
      subjects!course_subjects_subject_id_fkey (
        id,
        name,
        credits,
        period
      )
    `
    )
    .eq("course_id", courseId);

  if (error) {
    console.error("Erro ao buscar disciplinas:", error);
    return [];
  }

  return (
    data?.flatMap(({ subjects, semester, prerequisites }) =>
      (Array.isArray(subjects) ? subjects : [subjects]).map((subject) => ({
        id: subject.id,
        name: subject.name,
        credits: subject.credits,
        period: subject.period,
        semester,
        prerequisites: prerequisites || [],
      }))
    ) || []
  );
}
