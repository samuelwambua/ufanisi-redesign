import ServiceDetailPage from "../components/services/ServiceDetailPage";
import { getServiceBySlug } from "../components/services/servicesData";

export default function CustomsClearancePage() {
  const service = getServiceBySlug("customs-clearance")!;
  return <ServiceDetailPage service={service} />;
}