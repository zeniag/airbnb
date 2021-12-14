import { sanityClient } from "../sanity";

import { useRouter } from "next/router";

const Home = ({ properties }) => {
  console.log(properties);
  return (
    <>
      <h1>Hello</h1>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = '*[_type == "property"]';
  const properties = await sanityClient.fetch(query);

  if (!properties.length) {
    return {
      props: {
        properties: [],
      },
    };
  } else {
    return {
      props: {
        properties,
      },
    };
  }
};
