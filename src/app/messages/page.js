import { Heading } from "@/components/common/heading";
import MessagesComponent from "@/components/MessagesComponent";

export default function MessagesPage() {
  return (
    <>
      <Heading>Mensajes y notificaciones</Heading>

      <div aria-live="assertive" className="flex items-end py-4">
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <MessagesComponent />
        </div>
      </div>
    </>
  );
}
