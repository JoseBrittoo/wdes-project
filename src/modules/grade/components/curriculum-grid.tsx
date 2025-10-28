import { useState, useMemo } from "react";
import type { Course, SubjectStatus } from "./../types/curriculum";
import { SubjectCard } from "./../components/subject-card";
import { Card, CardContent, CardHeader, CardTitle } from "./../components/card";

interface CurriculumGridProps {
  course: Course;
}

function groupByPeriod(subjects: Course["subjects"]) {
  const periodsMap = new Map<number, Course["subjects"]>();
  if (subjects) {
    subjects.forEach((subject) => {
      if (!periodsMap.has(subject.period)) {
        periodsMap.set(subject.period, []);
      }
      periodsMap.get(subject.period)!.push(subject);
    });
  }
  return Array.from(periodsMap.entries()).sort(([a], [b]) => a - b);
}

function getStatusCounts(subjectStatuses: Record<string, SubjectStatus>) {
  return Object.values(subjectStatuses).reduce(
    (counts, status) => {
      counts[status]++;
      return counts;
    },
    {
      "not-taken": 0,
      taking: 0,
      completed: 0,
      failed: 0,
    }
  );
}

export function CurriculumGrid({ course }: CurriculumGridProps) {
  const [subjectStatuses, setSubjectStatuses] = useState<
    Record<string, SubjectStatus>
  >(() =>
    (course.subjects ?? []).reduce((acc, subject) => {
      acc[subject.id] = "not-taken";
      return acc;
    }, {} as Record<string, SubjectStatus>)
  );

  const handleStatusChange = (subjectId: string, status: SubjectStatus) => {
    setSubjectStatuses((prev) => ({
      ...prev,
      [subjectId]: status,
    }));
  };

  const periods = useMemo(
    () => groupByPeriod(course.subjects),
    [course.subjects]
  );
  const stats = useMemo(
    () => getStatusCounts(subjectStatuses),
    [subjectStatuses]
  );

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Legenda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6">
            {(["not-taken", "taking", "completed", "failed"] as const).map(
              (status) => (
                <div key={status} className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded ${
                      status === "not-taken"
                        ? "bg-gray-200"
                        : status === "taking"
                        ? "bg-blue-300"
                        : status === "completed"
                        ? "bg-green-300"
                        : "bg-red-300"
                    } border-2`}
                  />
                  <span className="text-sm">{`${status} (${stats[status]})`}</span>
                </div>
              )
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Clique nas disciplinas para alterar o status
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {periods.map(([periodNumber, subjects]) => (
          <Card key={periodNumber}>
            <CardHeader>
              <CardTitle className="text-base">
                {periodNumber}º Período
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {subjects?.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  status={subjectStatuses[subject.id]}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
