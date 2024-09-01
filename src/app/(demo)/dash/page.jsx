import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
<<<<<<< HEAD

import Alert from "@/components/ui/alert";
=======
import {BentoGridDemo} from '@/components/ui/bentogrid'
import { ClassList } from "@/components/component/class-list";
import Dash from "./Dash";
>>>>>>> 2f268695705be58a24bcc69c9879b9ecbf6dc421

export default function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>
<<<<<<< HEAD
        <></>
      </PlaceholderContent>
=======

        {/* <BentoGridDemo></BentoGridDemo> */}

         <Dash></Dash>

      </PlaceholderContent>

>>>>>>> 2f268695705be58a24bcc69c9879b9ecbf6dc421
    </ContentLayout>
  );
}
