import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi'; 

export function createCourse(course){
    return {type: types.CREATE_COURSE, course};
}

export function loadCoursesSucess(courses){
    return { type: types.LOAD_COURSES_SUCCESS, courses};
}

export function createCourseSucess(course){
    return { type: types.CREATE_COURSES_SUCCESS, course};
}

export function updateCourseSucess(course){
    return { type: types.UPDATE_COURSES_SUCCESS, course};
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

export function saveCourse(course){
    return dispatch=> {
        return courseApi.saveCourse(course).then(savedCourse => {
            if(course.id)
                dispatch(updateCourseSucess(savedCourse));
            else
                dispatch(createCourseSucess(savedCourse));
        }).catch(error =>{
            throw(error);
        });
    };
}