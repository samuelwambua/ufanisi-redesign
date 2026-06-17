import ServiceDetailPage from "../components/services/ServiceDetailPage";
import { getServiceBySlug } from "../components/services/servicesData";

export default function SeaFreightPage() {
  const service = getServiceBySlug("sea-freight")!;
  return <ServiceDetailPage service={service} />;
}