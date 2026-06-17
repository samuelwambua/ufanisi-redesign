import ServiceDetailPage from "../components/services/ServiceDetailPage";
import { getServiceBySlug } from "../components/services/servicesData";

export default function CrossBorderPage() {
  const service = getServiceBySlug("cross-border")!;
  return <ServiceDetailPage service={service} />;
}