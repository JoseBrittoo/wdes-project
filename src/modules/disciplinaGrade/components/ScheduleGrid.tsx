"use client"

interface ScheduleSlot {
  time: string
  subject: string
  room: string
}

interface DaySchedule {
  day: string
  slots: ScheduleSlot[]
}

interface ScheduleGridProps {
  schedule: DaySchedule[]
  onGerenciar: () => void
}

export default function ScheduleGrid({ schedule, onGerenciar }: ScheduleGridProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Gestão de 2025/2</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {schedule.map((daySchedule, index) => (
          <div key={index} className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">{daySchedule.day}</h4>
            <div className="space-y-2">
              {daySchedule.slots.map((slot, slotIndex) => (
                <div key={slotIndex} className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm">
                  <p className="font-medium text-foreground">
                    {slot.time} - {slot.subject}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{slot.room}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onGerenciar}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
      >
        Gerenciar Horários
      </button>
    </div>
  )
}
