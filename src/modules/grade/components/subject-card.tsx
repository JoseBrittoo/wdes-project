import type { Subject, SubjectStatus } from "./../types/curriculum";
import { cn } from "./../../../lib/utils";

interface SubjectCardProps {
  subject: Subject;
  status: SubjectStatus;
  onStatusChange: (subjectId: string, status: SubjectStatus) => void;
}

const statusStyles: Record<SubjectStatus, string> = {
  "not-taken": "bg-gray-200 text-gray-800 border-gray-300",
  taking: "bg-blue-300 text-blue-900 border-blue-400",
  completed: "bg-green-300 text-green-900 border-green-400",
  failed: "bg-red-300 text-red-900 border-red-400",
};

const statusOrder: SubjectStatus[] = [
  "not-taken",
  "taking",
  "completed",
  "failed",
];

export function SubjectCard({
  subject,
  status,
  onStatusChange,
}: SubjectCardProps) {
  const handleClick = () => {
    const currentIndex = statusOrder.indexOf(status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    onStatusChange(String(subject.id), statusOrder[nextIndex]);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full p-4 rounded-lg border-2 transition-all hover:scale-[1.02] hover:shadow-md text-left",
        statusStyles[status]
      )}
    >
      <h3 className="font-semibold text-sm leading-tight mb-2">
        {subject.name}
      </h3>

      {subject.prerequisites?.length > 0 && (
        <p className="text-xs opacity-80">
          Pré-requisitos: {subject.prerequisites.join(", ")}
        </p>
      )}
    </button>
  );
}
