import Layout from '../components/Layout';
import PropertyCard from '../components/PropertyCard';

export default function Listings() {
  return (
    <Layout>
      <h1>Property Listings</h1>
      <PropertyCard title="Sample Property" image="/lotus-logo.svg" price="$1,000,000" />
    </Layout>
  );
}
