import ServiceDetailPage from "../components/services/ServiceDetailPage";
import { getServiceBySlug } from "../components/services/servicesData";

export default function ProjectCargoPage() {
  const service = getServiceBySlug("project-cargo")!;
  return <ServiceDetailPage service={service} />;
}