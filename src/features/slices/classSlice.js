export const revalidate = 0;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  //general response message/notice
  message: "",
  allClasses: [],
  listClasses: [],
  //REDUX STATUS success| failed |loading
  status: {
    single: "idle",
    student: "idle",

    allClasses: "idle",

    listClasses: "idle",

    createClass: "idle",
    deleteClass: "idle",
    renameClass: "idle",
  },

  singleClass: {}, //Particular class

  studentData: null, // student
  studentEditedData: {},

  selectedStudent: null, //onclick student listitem
};

const classSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    SET_SELECTED_STUDENT: (state, action) => {
      state.selectedStudent = action.payload;
    },
    SET_STUDENT_EDITED_DATA: (state, action) => {
      state.studentEditedData = action.payload;
    },
    RESET_CLASS_STATUS: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    //All classes data----------------------------------------------
    builder.addCase(getClassesData.fulfilled, (state, action) => {
      state.allClasses = action.payload;
      state.status.allClasses = "success";
    });
    builder.addCase(getClassesData.pending, (state, action) => {
      state.status.allClasses = "loading";
    });
    builder.addCase(getClassesData.rejected, (state, action) => {
      state.status.allClasses = "failed";
    });

    //List of classes------------------------------------------------
    builder.addCase(getListOfClasses.fulfilled, (state, action) => {
      state.listClasses = action.payload;
      state.status.listClasses = "success";
    });
    builder.addCase(getListOfClasses.pending, (state, action) => {
      state.status.listClasses = "loading";
    });
    builder.addCase(getListOfClasses.rejected, (state, action) => {
      state.status.listClasses = "failed";
    });

    //Fetching single class------------------------------------------
    builder.addCase(getClassDataRTK.fulfilled, (state, action) => {
      state.singleClass = action.payload;
      state.status.single = "success";
    });
    builder.addCase(getClassDataRTK.pending, (state, action) => {
      state.status.single = "loading";
    });
    builder.addCase(getClassDataRTK.rejected, (state, action) => {
      state.status.single = "failed";
    });

    //Fetching single student--------------------------------------
    builder.addCase(getStudentData.fulfilled, (state, action) => {
      state.studentData = action.payload;
      state.status.student = "success";
    });
    builder.addCase(getStudentData.pending, (state, action) => {
      state.status.student = "loading";
    });
    builder.addCase(getStudentData.rejected, (state, action) => {
      state.status.student = "failed";
    });

    //Create new class--------------------------------------------
    builder.addCase(createNewClass.fulfilled, (state, action) => {
      state.message = action.payload.message;
      if (action.payload.status) {
        state.status.createClass = "success";
      }
      if (!action.payload.status) {
        state.status.createClass = "error";
      }
    });
    builder.addCase(createNewClass.pending, (state, action) => {
      state.status.createClass = "loading";
    });
    builder.addCase(createNewClass.rejected, (state, action) => {
      state.message = "Failed to create";
      state.status.createClass = "failed";
    });

    //DELETE ANY CLASS--------------------------------------------
    builder.addCase(deleteClass.fulfilled, (state, action) => {
      state.message = action.payload.message;
      if (action.payload.status) {
        state.status.deleteClass = "success";
      }
      if (!action.payload.status) {
        state.status.deleteClass = "error";
      }
    });
    builder.addCase(deleteClass.pending, (state, action) => {
      state.status.deleteClass = "loading";
    });
    builder.addCase(deleteClass.rejected, (state, action) => {
      state.message = "Failed to delete";
      state.status.deleteClass = "failed";
    });

    //RENAME ANY CLASS--------------------------------------------
    builder.addCase(renameClass.fulfilled, (state, action) => {
      state.message = action.payload.message;
      if (action.payload.status) {
        state.status.renameClass = "success";
      }
      if (!action.payload.status) {
        state.status.renameClass = "error";
      }
    });
    builder.addCase(renameClass.pending, (state, action) => {
      state.status.renameClass = "loading";
    });
    builder.addCase(renameClass.rejected, (state, action) => {
      state.message = "Failed to rename class";
      state.status.renameClass = "failed";
    });
  },
});

export const {
  SET_SELECTED_STUDENT,
  SET_STUDENT_EDITED_DATA,
  RESET_CLASS_STATUS,
} = classSlice.actions;
export default classSlice.reducer;

/**[FETCH ALL CLASSES DATA]
 * Fetch data for all classes in database.
 * Response contains array of all classes with students data as well.
 */
export const getClassesData = createAsyncThunk(
  "get/get-classes",
  async (thunkApi) => {
    const response = await fetch("/api/classes/get-classes", {
      cache: "no-store",
    });
    const data = await response.json();
    return data.classes;
  }
);

/**[FETCH LIST OF CLASSES]
 * Fetch Only list of classes from database.
 * Response data may look like : [{_id:'',name:''}]
 */
export const getListOfClasses = createAsyncThunk(
  "get/list-classes",
  async (thunkApi) => {
    const response = await fetch("/api/classes/list-classes", {
      cache: "no-store",
    });
    const data = await response.json();
    return data.list;
  }
);

/**[FETCH WHOLE CLASS]
 * Retrieve any class whole data.
 * Request requires class_name.
 */

export const getClassDataRTK = createAsyncThunk(
  "get/get-single-class",
  async (classId, thunkApi) => {
    const resp = await fetch("/api/classes/single-class?classId=" + classId);
    const data = await resp.json();
    return data;
  }
);

/**[FETCH STUDENT]
 * For fetching any student data.
 * Data required for request includes: {class_name,student_id}
 */
export const getStudentData = createAsyncThunk(
  "get/single-student",
  async (studentToFind, thunkApi) => {
    const resp = await fetch(
      "/api/classes/single-class/student?classId=" +
        studentToFind.classId +
        "&student_id=" +
        studentToFind.student_id
   
    );
    const data = await resp.json();
    return data;
  }
);

/**[CREATE NEW CLASS]:
 * For creating new class
 */
export const createNewClass = createAsyncThunk(
  "get/create-class",
  async (newClass, thunkApi) => {
    const resp = await fetch("/api/classes/create-class", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ newClass }),
      next: { revalidate: 30 },
    });
    const data = await resp.json();
    return data;
  }
);

/**[DELETE CLASS]:
 * The thunk executes the class deletion action.
 * Body data: {actionBy:{user,date},class_name}
 */
export const deleteClass = createAsyncThunk(
  "get/delete-class",
  async (data, thunkApi) => {
    const resp = await fetch("/api/classes/single-class/delete-class", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ ...data }),
      next: { revalidate: 30 },
    });
    const respData = await resp.json();
    return respData;
  }
);

/**[RENAME]
 * Change name of the current class or a selected class by admin
 *
 */
export const renameClass = createAsyncThunk(
  "get/rename-class",
  async (data, thunkApi) => {
    const resp = await fetch("/api/classes/single-class/rename-class", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ ...data }),
      next: { revalidate: 30 },
    });
    const respData = await resp.json();
    return respData;
  }
);
