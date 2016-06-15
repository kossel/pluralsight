import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            course: Object.assign({},this.props.course),
            error:{}
        };
        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    updateCourseState(event){
        const field  = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course: course});
    }

    saveCourse(event){
        event.preventDefault();
        this.props.actions.saveCourse(this.state.course);
        this.context.router.push('/courses');
    }

    render(){
        return(
            <div>
                <CourseForm 
                    course={this.props.course} 
                    allAuthors={this.props.authors}
                    error={this.state.error}
                    onChange={this.updateCourseState}
                    onSave={this.saveCourse}
                />
            </div>
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, courseId){
    let result = courses.filter(course=>(course.id==courseId));
    if(result.length>0) return result[0];
    return null;
}

function mapStateToProps(state, ownProps){
    const courseId = ownProps.params.id;
    let course ={id:'', watchHref:'', title:'', authorId:'', length:'', category: ''};

    if(courseId && state.courses.length>0){
        course = getCourseById(state.courses, courseId);
    }

    const formatAuthorsOptions = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName + ' '+ author.lastName
        };
    });

    return {
        course: course,
        authors: formatAuthorsOptions
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(courseActions,dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ManageCoursePage);