const { and, rule, shield } = require("graphql-shield");

function checkPermission(user, permission) {
  if (user && user["https://spaceapi.com/graphql"]) {
    return user["https://spaceapi.com/graphql"].permissions.includes(
      permission
    );
  }
  return false;
}

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

const ruleRoot = rule()((parent, args, { user }) => {
  return checkPermission(user, "read:root");
});

const ruleUser = rule()((parent, args, { user }) => {
  return checkPermission(user, "read:user");
});

module.exports=shield({
  Query:{
    viewer: isAuthenticated
  },
  Mutation: {
    createAnnonce: and(isAuthenticated, ruleRoot),
    deleteAnnonce: and(isAuthenticated, ruleRoot),
    updateAnnonce: and(isAuthenticated, ruleRoot)
  }
});
