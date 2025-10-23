import React from "react";
import { Card, CardContent } from "../../dashboards/components/Card";
import type { LucideIcon } from "lucide-react";

type CardStatProps = {
    title: string;
    value: string | number;
    icon: LucideIcon;
    iconColor: string;
    bgColor: string;
    subtitle?: string;
};

const CardStat: React.FC<CardStatProps> = ({ title, value, icon: Icon, iconColor, bgColor, subtitle }) => {
    return (
        <Card>
            <CardContent>"
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">{title}</p>
                        <p className="text-3xl font-bold">{value}</p>
                        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${iconColor}`} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardStat;
