// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import person from "./documents/person";
import property from "./documents/property";
import host from "./objects/host";
import propertyImage from "./objects/propertyImage";
import review from "./objects/review";
import traveler from "./objects/traveler";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  types: schemaTypes.concat([
    person,
    property,
    host,
    propertyImage,
    review,
    traveler,
  ]),
});
