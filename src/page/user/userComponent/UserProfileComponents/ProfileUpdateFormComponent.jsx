import React from 'react'
import InputFiledWC from '../../../../components/FormWithoutClass/InputFiledWC'
import SelectInputWC from '../../../../components/FormWithoutClass/SelectInputWC'
import SelectMultipleInput from '../../../../components/FormWithoutClass/SelectMultipleInput'
import Checkbox from '../../../../components/Form/Checkbox'
import FormPageTitle from '../../../../components/Form/FormPageTitle'
import LoadingSpinner from '../../../../components/LoadingSpinner'
import ProfileUpdateFormHandlerComponent from './ProfileUpdateFormHandlerComponent'

const ProfileUpdateFormComponent = () => {
    const {
        hasPermission,
        inputErrorList,
        formData,
        loading,
        companyOptions,
        selectedCompany,
        secondaryCompanyOptions,
        selectedSecondaryCompany,
        departmentOptions,
        selectedDepartment,
        designationOptions,
        selectedDesignation,
        reportingOptions,
        selectedReporting,
        roleOptions,
        selectedRole,
        primaryRoleOptions,
        selectedPrimaryRole,
        helpdeskRoleOptions,
        selectedHelpdeskRole,
        errorMessage,
        handleChange,
        handleSelectChange,
        handleRoleChange,
        handleSecondaryCompanyChange,
        handlePrimaryRoleChange,
        handleReportingChange,
        handleCompanyChange,
        handleDepartmentChange,
        handleDesignationChange,
        handlePermissionChange,
        handleModelPermissionChange,
        handleHelpdeskRoleChange,
        currentPhoto,
        imagePreview,
        handleEditSubmit,
    }=ProfileUpdateFormHandlerComponent()

   
  return (
    <div className='bg-[#fff] my-4 rounded-[5px]'>
    <FormPageTitle title='User Add Form' FormPageRightSideButtonURL='/profile' LinkName='Close' />

    <form onSubmit={handleEditSubmit} encType="multipart/form-data">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 shadow-xl p-3">
        <div className='my-4'>
          <InputFiledWC className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
            type='text'
            value={formData.user.first_name}
            onChange={handleChange}
            name='first_name'
            id='first_name'
            label='First Name *'
           //  isRequired={true}
            placeholder='Enter first name'
          />
         <span className='text-[#9D3030] text-left'>{inputErrorList?.user?.first_name}</span>

        </div>
        <div className='my-4'>
          <InputFiledWC className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
            type='text'
            value={formData.user.last_name}
            onChange={handleChange}
            name='last_name'
            id='last_name'
            label='Last Name *'
           //  isRequired={true}
            placeholder='Enter Last name'
          />
         <span className='text-[#9D3030] text-left'>{inputErrorList?.user?.last_name}</span>
        </div>
        <div className='my-4'>
          <InputFiledWC className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
            type='text'
            value={formData.user.username}
            onChange={handleChange}
            name='username'
            id='username'
            label='Email *'
           //  isRequired={true}
            placeholder='Enter user name'
          />
         <span className='text-[#9D3030] text-left'>{inputErrorList?.user?.username}</span>

        </div>

        <div className='my-4'>
          <SelectInputWC className={`appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4] text-justify`}
            name='department'
            id='department'
            label='Department *'
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            options={departmentOptions}
            isRequired={false}
            isClearable={true}
          />
           <span className='text-[#9D3030] text-left'>{inputErrorList?.department}</span>
        </div>
        <div className='my-4'>
          <SelectInputWC className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
            name='designation'
            id='designation'
            label='Designation *'
            value={selectedDesignation}
            onChange={handleDesignationChange}
            options={designationOptions}
            isRequired={false}
            isClearable={true}
          />
           <span className='text-[#9D3030] text-left'>{inputErrorList?.designation}</span>

        </div>


        <div className='my-4'>
          <SelectInputWC
            className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
            name='helpdesk_role'
            id='helpdesk_role'
            label='Helpdesk Role *'
            value={selectedHelpdeskRole}
            onChange={handleHelpdeskRoleChange}
            options={helpdeskRoleOptions}
           //  isRequired={true}
            isClearable={true}
          />
           <span className='text-[#9D3030] text-left'>{inputErrorList?.helpdesk_role}</span>
        </div>
        <div className='my-4'>
              <SelectInputWC
                className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
                name='reporting_to'
                id='reporting_to'
                label='Reporting To*'
                value={selectedReporting}
                onChange={handleReportingChange}
                options={reportingOptions}
                isRequired={false}
                isClearable={true}
              />
           <span className='text-[#9D3030] text-left'>{inputErrorList?.reporting_to}</span>
            </div>

            <div className='mb-2 mt-[17px]'>
              <InputFiledWC
                className='pl-3 py-[6px]  appearance-none border-[1px] border-[#9d9c9c] w-full focus:outline-none focus:bg-white focus:border-[#2e6da4]'
                type='file'
                onChange={handleChange}
                name='image'
                id='image'
                label='Photo'
                isRequired={false}
                placeholder='Select photo'
              />
              {imagePreview?
              <>
                {imagePreview && <img src={imagePreview} alt="Phone" className='w-[30px] h-[30px] mt-2' />}
              </>
              :
              <>
                {currentPhoto && <img src={currentPhoto} alt="Phone" className='w-[30px] h-[30px] mt-2' />}
              </>
              }

            </div>

            <div className="my-4">
          <SelectInputWC 
          className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
            name='role'
            id='role'
            label='Role *'
            value={selectedPrimaryRole}
            onChange={handlePrimaryRoleChange}
            options={primaryRoleOptions}
            isRequired={false}
            isClearable={true}
          />
           <span className='text-[#9D3030] text-left'>{inputErrorList?.role}</span>
        </div>

        <div className='my-4'>
          <SelectInputWC className={`appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4] text-justify`}
            name='company'
            id='company'
            label='Company *'
            value={selectedCompany}
            onChange={handleCompanyChange}
            options={companyOptions}
            isRequired={false}
            isClearable={true}
          />
           <span className='text-[#9D3030] text-left'>{inputErrorList?.company}</span>
        </div>

        <div className='my-4'>
          <SelectMultipleInput 
          className={`appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4] text-justify`}
            name='secondary_role'
            id='secondary_role'
            label='Secondary Role *'
            value={selectedRole}
            onChange={handleRoleChange}
            options={roleOptions}
            isRequired={false}
            isMulti={true}
          />
           <span className='text-[#9D3030] text-left'>{inputErrorList?.secondary_company}</span>
        </div>

        <div className='my-4'>
          <SelectMultipleInput className={`appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4] text-justify`}
            name='secondary_company'
            id='secondary_company'
            label='Secondary Company *'
            value={selectedSecondaryCompany}
            onChange={handleSecondaryCompanyChange}
            options={secondaryCompanyOptions}
            isRequired={false}
            isMulti={true}
          />
           <span className='text-[#9D3030] text-left'>{inputErrorList?.secondary_company}</span>

        </div>


        <div className="my-2">
          <Checkbox
            type='checkbox'
            checked={formData.is_department_head}
            onChange={handleChange}
            name='is_department_head'
            id='is_department_head'
            label='Is department head?'
            isRequired={false}
            placeholder='is_department_head?'
          />
        </div>
      </div>
      
      {hasPermission('change_profile') && (
        <div className="mt-5 ">
          <button
            type='submit'
            className='bg-[#2e6da4] text-[#fff] rounded-[5px] px-4 py-1'>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      )}

      {/* </div> */}
    </form>
    
  </div>
  )
}

export default ProfileUpdateFormComponent