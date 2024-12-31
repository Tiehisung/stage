/**
 * how to updated embedded array document fields
 */

async function iUpdatedNestedArrayDocument() {
  const updated = await ClassModel.updateMany(
    {},
    { $set: { "students.$[].academics": academics } }
  );
}

/**
 * how to rename embedded array document fields
 */

async function iRenameNestedDocumentField() {
  let Class = "kg-1";

  const classDocument = await ClassModel.findOne({ name: Class });
  classDocument.students.forEach((student) => {
    student.student_id = student.admission_number;
    delete student.admission_number;
  });
  const renamedClassNestedField = await ClassModel.updateOne(
    { name: Class },
    {
      $set: {
        name: classDocument.name,
        students: classDocument.students,
      },
    }
  );
}
