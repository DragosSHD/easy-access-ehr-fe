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
        field: 'allergy',
    },
    CONDITIONS: {
        display: 'Conditions',
        field: 'condition',
    },
    IMMUNIZATIONS: {
        display: 'Immunizations',
        field: 'immunization',
    },
    MEDICATION: {
        display: 'Medication',
        field: 'medication',
    },
    MEDICAL_TESTS: {
        display: 'MedicalTests',
        field: 'medicalTest',
    },
};
export const userRoles = {
    ADMIN: 'ADMIN',
    DOCTOR: 'DOCTOR',
    PATIENT: 'PATIENT',
}