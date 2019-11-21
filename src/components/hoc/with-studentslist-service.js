import React from 'react';
import { StudentslistServiceConsumer } from '../studentslist-service-context';
const withStudentslistService = () => (Wrapped) => {
    return (props) => {
        return (
            <StudentslistServiceConsumer>
                {
                    (studentslistService) => {
                        return <Wrapped {...props} studentslistService={studentslistService} />
                    }
                }
            </StudentslistServiceConsumer>
        )
    }
}

export default withStudentslistService;