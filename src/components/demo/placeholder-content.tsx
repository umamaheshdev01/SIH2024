import Link from "next/link";
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type PlaceholderContentProps = {
  children: ReactNode;
};

export default function PlaceholderContent({ children }: PlaceholderContentProps) {
  return (
    <Card className="rounded-lg border-none mt-6 w-full">
      <CardContent className="p-6 w-full">
        <div className="flex justify-center items-start min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] w-full">
          <div className="flex flex-col relative w-full">
            {/* <Image
              src="/placeholder.png"
              alt="Placeholder Image"
              width={500}
              height={500}
              priority
            /> */}

            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
