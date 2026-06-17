import ServiceDetailPage from "../components/services/ServiceDetailPage";
import { getServiceBySlug } from "../components/services/servicesData";

export default function WarehousingPage() {
  const service = getServiceBySlug("warehousing")!;
  return <ServiceDetailPage service={service} />;
}