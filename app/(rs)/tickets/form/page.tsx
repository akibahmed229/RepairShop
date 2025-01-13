import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "./TicketForm";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as KindeInit } from "@kinde/management-api-js";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [Key: string]: string | undefined }>;
}) {
  const { customerId, ticketId } = await searchParams;

  if (!customerId && !ticketId) {
    return { title: "Missing Ticker ID or Customer ID" };
  }
  if (customerId) {
    return { title: `New Ticket for Customer ID #${customerId}` };
  }
  return { title: `Edit Ticket #${ticketId}` };
}

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [Key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">Ticket ID or Customer ID required!</h2>
          <BackButton title="Go Back" varient="default" />
        </>
      );
    }

    const { getPermission, getUser } = getKindeServerSession();
    const [managerPermission, user] = await Promise.all([
      getPermission("manager"),
      getUser(),
    ]);
    const isManager = managerPermission?.isGranted;

    // new ticket form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found!
            </h2>
            <BackButton title="Go Back" varient="default" />
          </>
        );
      }

      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} is not active!
            </h2>
            <BackButton title="Go Back" varient="default" />
          </>
        );
      }

      // return ticket form
      if (isManager) {
        KindeInit(); // initialize Kinde Management API
        const { users } = await Users.getUsers();

        const techs = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];

        return <TicketForm customer={customer} techs={techs} />;
      } else {
        return <TicketForm customer={customer} />;
      }
    }

    // Edit ticket form
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found!</h2>
            <BackButton title="Go Back" varient="default" />
          </>
        );
      }

      const customer = await getCustomer(ticket.customerId);

      // return ticket form
      if (isManager) {
        KindeInit(); // initialize Kinde Management API
        const { users } = await Users.getUsers();

        const techs = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];

        return <TicketForm customer={customer} ticket={ticket} techs={techs} />;
      } else {
        const isEditable = user?.email === ticket.tech;
        return (
          <TicketForm
            customer={customer}
            ticket={ticket}
            isEditable={isEditable}
          />
        );
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
      throw error;
    }
  }
}
