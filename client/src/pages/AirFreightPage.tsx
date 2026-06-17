import ServiceDetailPage from "../components/services/ServiceDetailPage";
import { getServiceBySlug } from "../components/services/servicesData";

export default function AirFreightPage() {
  const service = getServiceBySlug("air-freight")!;
  return <ServiceDetailPage service={service} />;
}