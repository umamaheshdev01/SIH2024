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
import {BentoGridDemo} from '@/components/ui/bentogrid'
import { ClassList } from "@/components/component/class-list";
import Attendance from "../../../components/Attendance";

export default function DashboardPage() {
  return (
    <ContentLayout title="Attendance">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Attendance</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Attendance</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent>

        {/* <BentoGridDemo></BentoGridDemo> */}

        {/* <ClassList></ClassList> */}

        <Attendance></Attendance>
        

      </PlaceholderContent>

    </ContentLayout>
  );
}
