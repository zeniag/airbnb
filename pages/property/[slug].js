import Image from "../../components/Image";
import { sanityClient } from "../../sanity";

import isMultiple from "../../utils";

const Property = ({
  id,
  title,
  location,
  propertyType,
  mainImage,
  images,
  pricePerNight,
  beds,
  bedrooms,
  description,
  host,
  reviews,
}) => {
  return (
    <div className="container">
      <h1>
        <b>{title}</b>
      </h1>
      <p>
        {reviews.length} review{isMultiple(reviews)}
      </p>
      <div className="images-section">
        <Image identifier="main-image" image={mainImage} alt={title} />
        <div className="sub-images-section">
          {images.map(({ _key, asset }, img) => (
            <Image key={_key} identifier="image" image={asset} alt={title} />
          ))}
        </div>
      </div>
      <h2>
        <b>
          {propertyType} hosted by {host?.name}
        </b>
      </h2>
      <h4>
        {bedrooms} bedroom{isMultiple(bedrooms)} * {beds} bed{isMultiple(beds)}
      </h4>
      <hr />
      <h4>
        <b>Enhanced Clean</b>
      </h4>
      <p>
        This host is committed to Airbnb&apos;s 5-step enhanced cleaning process
      </p>
      <h4>
        <b>House Rules</b>
      </h4>
      <p>
        This place isn&apos;t suited for pets and the host does not allow
        parties or smoking
      </p>

      <div className="price-box">
        <h2>$ {pricePerNight} Per Night</h2>
        <h4>
          {reviews.length} review{isMultiple(reviews)}
        </h4>
        <div className="button" onClick={() => {}}>
          Change Dates
        </div>
      </div>
    </div>
  );
};

export default Property;

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  const query = `*[_type == "property" && slug.current == $pageSlug][0]{
    "id": _id,
    title,
    location,
    propertyType,
    mainImage,
    images,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host->{
      _id,
      name,
      slug,
      image
    },
    reviews[]{
      ...,
      traveler->{
        _id,
        name,
        slug,
        image
      }
    }
  }`;

  const property = await sanityClient.fetch(query, { pageSlug });

  if (!property) {
    return {
      props: null,
      notFound: true,
    };
  } else {
    return {
      props: {
        id: property.id,
        title: property.title,
        location: property.location,
        propertyType: property.propertyType,
        mainImage: property.mainImage,
        images: property.images,
        pricePerNight: property.pricePerNight,
        beds: property.beds,
        bedrooms: property.bedrooms,
        description: property.description,
        host: property.host,
        reviews: property.reviews,
      },
    };
  }
};
