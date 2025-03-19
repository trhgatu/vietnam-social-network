'use client'

import { useTranslation } from "react-i18next";

export function NotificationsPage() {
    const { t } = useTranslation("common");
    return (
        <div className="space-y-4">
            <div className="rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium">{t("notifications.title")}</h2>
                </div>
            </div>
        </div>
    );
}