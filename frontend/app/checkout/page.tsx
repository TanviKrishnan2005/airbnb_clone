import CheckoutClient from "./CheckoutClient";

type Props = {
  searchParams: Promise<{
    listingId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
    total?: string;
  }>;
};

export default async function CheckoutPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  return (
    <CheckoutClient
      listingId={params.listingId || ""}
      checkIn={params.checkIn || ""}
      checkOut={params.checkOut || ""}
      guests={params.guests || ""}
      total={params.total || ""}
    />
  );
}