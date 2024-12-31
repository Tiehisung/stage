/**
 * Delete a field
 */
const deleteMDBfield = await db.collection("classes").updateMany(
  {},
  {
    $unset: {
      is_promote_class: "",
    },
  }
);
