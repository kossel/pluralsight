import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi'; 

export function createCourse(course){
    return {type: types.CREATE_COURSE, course};
}

export function loadCoursesSucess(courses){
    return { type: types.LOAD_COURSES_SUCCESS, courses};
}

export function loadCourses(){
    return dispatch=> {
        return courseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSucess(courses));
        }).catch(error =>{
            throw(error);
        });
    };
}