import ServiceDetailPage from "../components/services/ServiceDetailPage";
import { getServiceBySlug } from "../components/services/servicesData";

export default function TruckingPage() {
  const service = getServiceBySlug("trucking")!;
  return <ServiceDetailPage service={service} />;
}