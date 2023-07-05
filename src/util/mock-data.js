export const users = {
    patients: [
        {
            firstName: 'Dragos',
            lastName: 'Dobre',
            email: 'dragos.patient@gmail.com',
            id: 30,
            birthDate: '2000-07-02 11:38:21.519',
            ehr: {
                ALLERGIES: [
                    {
                        id: 1,
                        category: 'Medicine',
                        severity: 'LOW',
                        type: 'Chronic',
                        resourceType: 'AllergyIntolerance',
                    }
                ],
                CONDITIONS: [
                    {
                        id: 1,
                        category: 'Chronic',
                        severity: 'LOW',
                        text: 'Asthma',
                        bodySite: 'LUNGS',
                        diagnoseDate: '2023-07-02 11:38:21.610'
                    },
                    {
                        id: 2,
                        category: 'Chronic',
                        severity: 'MODERATE',
                        text: 'Chronic Obstructive Pulmonary Disease (COPD)',
                        bodySite: 'LUNGS',
                        diagnoseDate: '2020-05-15 00:00:00.000'
                    },
                    {
                        id: 3,
                        category: 'Infectious',
                        severity: 'HIGH',
                        text: 'Pneumonia',
                        bodySite: 'LUNGS',
                        diagnoseDate: '2022-02-10 00:00:00.000'
                    },
                    {
                        id: 4,
                        category: 'Infectious',
                        severity: 'MODERATE',
                        text: 'Tuberculosis (TB)',
                        bodySite: 'LUNGS',
                        diagnoseDate: '2019-09-01 00:00:00.000'
                    },
                    {
                        id: 5,
                        category: 'Chronic',
                        severity: 'MODERATE',
                        text: 'Pulmonary Fibrosis',
                        bodySite: 'LUNGS',
                        diagnoseDate: '2018-12-20 00:00:00.000'
                    },
                ],
                IMMUNIZATIONS: [
                    {
                        date: '2023-06-28 07:30:00.000',
                        expirationDate: '2023-12-28 21:59:59.000',
                        description: 'COVID-19 Vaccine',
                        note: 'Protects against COVID-19',
                        doses: 1,
                        manufacturer: 'Pfizer'
                    },
                ],
                MEDICATION: [

                ],
                MEDICAL_TESTS: [

                ],
            }
        }
    ],
    doctors: [
        {
            firstName: 'Dragos',
            lastName: 'Dobre',
            email: 'dragos.doctor@gmail.com',
            id: 29,
            birthDate: '2000-07-02 11:38:21.519',
            ehr: {
                ALLERGIES: [],
                CONDITIONS: [
                    {
                        id: 4,
                        category: 'Infectious',
                        severity: 'MODERATE',
                        text: 'Tuberculosis (TB)',
                        bodySite: 'LUNGS',
                        diagnoseDate: '2019-09-01 00:00:00.000'
                    },
                    {
                        id: 5,
                        category: 'Chronic',
                        severity: 'MODERATE',
                        text: 'Pulmonary Fibrosis',
                        bodySite: 'LUNGS',
                        diagnoseDate: '2018-12-20 00:00:00.000'
                    },
                ],
                IMMUNIZATIONS: [
                    {
                        date: '2023-06-28 07:30:00.000',
                        expirationDate: '2023-12-28 21:59:59.000',
                        description: 'COVID-19 Vaccine (Johnson & Johnson)',
                        note: 'Single-dose vaccine for COVID-19',
                        doses: 1,
                        manufacturer: 'Novartis'
                    },
                ],
                MEDICATION: [],
                MEDICAL_TESTS: [],
            }
        }
    ]
};