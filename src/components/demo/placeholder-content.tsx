import Link from "next/link";
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type PlaceholderContentProps = {
  children: ReactNode;
};

export default function PlaceholderContent({ children }: PlaceholderContentProps) {
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <div className="flex flex-col relative">
            {/* <Image
              src="/placeholder.png"
              alt="Placeholder Image"
              width={500}
              height={500}
              priority
            /> */}

            {children}
            <div className="absolute -bottom-8 right-0">
              <Link
                href="https://www.freepik.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground"
              >
                {/* Link text goes here */}
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
