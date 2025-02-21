import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ComsumptionMethodOptionProps {
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumptionMethod;
  slug: string;
}
const ComsumptionMethodOption = ({
  buttonText,
  imageAlt,
  imageUrl,
  option,
  slug,
}: ComsumptionMethodOptionProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 pt-8">
        <div className="relative h-[80px] w-[80px]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-contain"
          />
        </div>

        <Button variant="secondary" className="rounded-full" asChild>
          <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
            {buttonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ComsumptionMethodOption;
