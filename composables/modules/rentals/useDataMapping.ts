import { ref } from 'vue';

interface Credential {
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  isActive: boolean;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  stateOfOrigin: string;
  lga: string;
  maritalStatus: string;
  profilePicture: string | null;
  currentLandlord: string | null;
  rentalAddress: string | null;
  lengthOfTenancy: string | null;
  reasonForMovingOut: string | null;
  employmentStatus: string | null;
  employerName: string | null;
  employerAddress: string | null;
  occupation: string | null;
  monthlyNetSalary: string | null;
  nextOfKinName: string | null;
  nextOfKinRelationship: string | null;
  nextOfKinEmail: string | null;
  nextOfKinAddress: string | null;
  nextOfKinPhone: string | null;
  nextOfKinOccupation: string | null;
  nextOfKinEmployer: string | null;
  nextOfKinEmployerAddress: string | null;
  shouldContactReferences: boolean | null;
}

const personalMapping = {
  name: 'Name',
  email: 'Email address',
  phone: 'Phone number',
  dob: 'Date of Birth',
  gender: 'Gender',
  maritalStatus: 'Marital status',
  stateOfOrigin: 'State of Origin',
  lga: 'Local Government (LGA)',
};

const rentalMapping = {
  currentLandlord: 'Current Landlord',
  address: 'Rental Address',
  lengthOfTenancy: 'Length of Tenancy',
  reasonForMovingOut: 'Reason for moving out',
};

const employmentMapping = {
  status: 'Current employment status',
  employerName: 'Employer\'s full name',
  occupation: 'Occupation',
  organizationAddress: 'Organization address',
  salary: 'Monthly Net Salary',
};

const nextOfKinMapping = {
  fullName: 'Full Name',
  relationship: 'Relationship',
  email: 'Email address',
  address: 'Residential address',
  phone: 'Phone Number',
  occupation: 'Occupation',
  organizationName: 'Organization name',
  officeAddress: 'Office address',
};

export function useDataMapping() {
  const credential = ref<Credential>({
    firstName: '',
    lastName: '',
    email: '',
    isEmailVerified: false,
    isActive: false,
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    stateOfOrigin: '',
    lga: '',
    profilePicture: null,
    currentLandlord: null,
    rentalAddress: null,
    lengthOfTenancy: null,
    reasonForMovingOut: null,
    employmentStatus: null,
    employerName: null,
    employerAddress: null,
    occupation: null,
    monthlyNetSalary: null,
    nextOfKinName: null,
    nextOfKinRelationship: null,
    nextOfKinEmail: null,
    nextOfKinAddress: null,
    nextOfKinPhone: null,
    nextOfKinOccupation: null,
    nextOfKinEmployer: null,
    nextOfKinEmployerAddress: null,
    shouldContactReferences: null,
  });

  const mapDataToCredential = (data: Array<{ label: string; value: any }>) => {
    data.forEach((item) => {
      // Personal Data Mapping
      if (item.label === personalMapping.name) {
        const [firstName, lastName] = item.value.split(' ');
        credential.value.firstName = firstName || '';
        credential.value.lastName = lastName || '';
      } else if (item.label === personalMapping.email) {
        credential.value.email = item.value;
      } else if (item.label === personalMapping.phone) {
        credential.value.phoneNumber = item.value.toString();
      } else if (item.label === personalMapping.dob) {
        credential.value.dateOfBirth = item.value;
      } else if (item.label === personalMapping.gender) {
        credential.value.gender = item.value;
      } else if (item.label === personalMapping.maritalStatus) {
        credential.value.maritalStatus = item.value;
      } else if (item.label === personalMapping.stateOfOrigin) {
        credential.value.stateOfOrigin = item.value;
      }else if (item.label === personalMapping.lga) {
        credential.value.lga = item.value;
      }

      // Rental Data Mapping
      else if (item.label === rentalMapping.currentLandlord) {
        credential.value.currentLandlord = item.value;
      } else if (item.label === rentalMapping.address) {
        credential.value.rentalAddress = item.value;
      } else if (item.label === rentalMapping.lengthOfTenancy) {
        credential.value.lengthOfTenancy = item.value;
      } else if (item.label === rentalMapping.reasonForMovingOut) {
        credential.value.reasonForMovingOut = item.value;
      }

      // Employment Data Mapping
      else if (item.label === employmentMapping.status) {
        credential.value.employmentStatus = item.value;
      } else if (item.label === employmentMapping.employerName) {
        credential.value.employerName = item.value;
      } else if (item.label === employmentMapping.occupation) {
        credential.value.occupation = item.value;
      } else if (item.label === employmentMapping.organizationAddress) {
        credential.value.employerAddress = item.value;
      } else if (item.label === employmentMapping.salary) {
        credential.value.monthlyNetSalary = item.value;
      }

      // Next of Kin Data Mapping
      else if (item.label === nextOfKinMapping.fullName) {
        credential.value.nextOfKinName = item.value;
      } else if (item.label === nextOfKinMapping.relationship) {
        credential.value.nextOfKinRelationship = item.value;
      } else if (item.label === nextOfKinMapping.email) {
        credential.value.nextOfKinEmail = item.value;
      } else if (item.label === nextOfKinMapping.address) {
        credential.value.nextOfKinAddress = item.value;
      } else if (item.label === nextOfKinMapping.phone) {
        credential.value.nextOfKinPhone = item.value;
      } else if (item.label === nextOfKinMapping.occupation) {
        credential.value.nextOfKinOccupation = item.value;
      } else if (item.label === nextOfKinMapping.organizationName) {
        credential.value.nextOfKinEmployer = item.value;
      } else if (item.label === nextOfKinMapping.officeAddress) {
        credential.value.nextOfKinEmployerAddress = item.value;
      }
    });
  };

  return {
    credential,
    mapDataToCredential,
  };
}
