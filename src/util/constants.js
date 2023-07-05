export const appTitle = 'Easy Access EHR';
export const appVersion = '1.0.0';
// export const ehrCategories = [
//     'Allergies',
//     'Conditions',
//     'Immunizations',
//     'Medication',
//     'Medical Tests',
// ];
export const ehrCategories = {
    ALLERGIES: {
        display: 'Allergies',
        field: 'allergies',
    },
    CONDITIONS: {
        display: 'Conditions',
        field: 'conditions',
    },
    IMMUNIZATIONS: {
        display: 'Immunizations',
        field: 'immunizations',
    },
    MEDICATION: {
        display: 'Medication',
        field: 'medications',
    },
    MEDICAL_TESTS: {
        display: 'MedicalTests',
        field: 'medicalTests',
    },
};
export const userRoles = {
    ADMIN: 'ADMIN',
    DOCTOR: 'DOCTOR',
    PATIENT: 'PATIENT',
}