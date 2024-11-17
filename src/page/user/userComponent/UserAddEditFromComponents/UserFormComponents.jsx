import React from 'react'
import UserFormHandleComponents from './UserFormHandleComponents'
import InputFiledWC from '../../../../components/FormWithoutClass/InputFiledWC'
import SelectInputWC from '../../../../components/FormWithoutClass/SelectInputWC'
import SelectMultipleInput from '../../../../components/FormWithoutClass/SelectMultipleInput'
import Checkbox from '../../../../components/Form/Checkbox'
import FormPageTitle from '../../../../components/Form/FormPageTitle'
import CheckboxPermissions from '../../../../components/Form/CheckboxPermissions'
import CheckboxPermissionModel from '../../../../components/Form/CheckboxPermissionModel'
import LoadingSpinner from '../../../../components/LoadingSpinner'

const UserFormComponents = ({id}) => {
    const {
        groupedPermissions,
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
        permissions,
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
        handleSubmit,
        currentPhoto,
        imagePreview,
        getLoading,
        handleEditSubmit,
    }=UserFormHandleComponents({id})

   
    if (getLoading) {
        return <div><LoadingSpinner /></div>;
    }

  return (
    <div className='bg-[#fff] my-4 rounded-[5px]'>
    <FormPageTitle title='User Add Form' FormPageRightSideButtonURL='/users' LinkName='Close' />

    <form onSubmit={!id?handleSubmit:handleEditSubmit} encType="multipart/form-data">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 shadow-xl p-3">
        <div className='my-4'>
          <InputFiledWC 
            className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
            type='text'
            value={formData.first_name}
            onChange={handleChange}
            name='first_name'
            id='first_name'
            label='First Name *'
           //  isRequired={true}
            placeholder='Enter first name'
          />
         <span className='text-[#9D3030] text-left'>{inputErrorList.first_name}</span>

        </div>
        <div className='my-4'>
          <InputFiledWC className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
            type='text'
            value={formData.last_name}
            onChange={handleChange}
            name='last_name'
            id='last_name'
            label='Last Name *'
           //  isRequired={true}
            placeholder='Enter Last name'
          />
         <span className='text-[#9D3030] text-left'>{inputErrorList.last_name}</span>
        </div>
        <div className='my-4'>
          <InputFiledWC className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
            type='text'
            value={formData.username}
            onChange={handleChange}
            name='username'
            id='username'
            label='Email *'
           //  isRequired={true}
            placeholder='Enter user name'
          />
         <span className='text-[#9D3030] text-left'>{inputErrorList.username}</span>

        </div>

        {!id &&(
        <div className='my-4'>
          <InputFiledWC
            className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
            type='password'
            value={formData.password}
            onChange={handleChange}
            name='password'
            id='password'
            label='Password *'
           //  isRequired={true}
            placeholder='Enter password'
          />
           <span className='text-[#9D3030] text-left'>{inputErrorList.password}</span>
        </div>
        )}
        
        <div className='my-4'>
          <InputFiledWC className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]'
            type='text'
            value={formData.user_profile.employee_id}
            onChange={handleChange}
            name='employee_id'
            id='employee_id'
            label='Employee ID *'
           //  isRequired={true}
            placeholder='Enter employee id'
          />
           <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.employee_id}</span>
          {/* {errorMessage?.employee_id && (
            <p className='text-red-500'>{errorMessage.employee_id}</p>
          )} */}
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
           <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.company}</span>
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
           <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.secondary_company}</span>

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
           <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.department}</span>
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
           <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.designation}</span>

        </div>
        <div className="my-4">
          <SelectInputWC className={`text-justify appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
            name='role'
            id='role'
            label='Role *'
            value={selectedPrimaryRole}
            onChange={handlePrimaryRoleChange}
            options={primaryRoleOptions}
            isRequired={false}
            isClearable={true}
          />
           <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.role}</span>
        </div>


        <div className='my-4'>
          <SelectMultipleInput className={`appearance-none border-[1px] w-[100%] focus:outline-none focus:bg-white focus:border-[#2e6da4] text-justify`}
            name='secondary_role'
            id='secondary_role'
            label='Secondary Role *'
            value={selectedRole}
            onChange={handleRoleChange}
            options={roleOptions}
            isRequired={false}
            isMulti={true}
          />
           <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.secondary_company}</span>
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
           <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.helpdesk_role}</span>
        </div>
        <div className='my-4 col-span-2 lg:col-span-3'>
          <div className='flex gap-3'>
            <div className='flex-1'>
              <SelectInputWC
                className={`text-justify appearance-none border-[1px] w-full focus:outline-none focus:bg-white focus:border-[#2e6da4]`}
                name='reporting_to'
                id='reporting_to'
                label='Reporting To*'
                value={selectedReporting}
                onChange={handleReportingChange}
                options={reportingOptions}
                isRequired={false}
                isClearable={true}
              />
           <span className='text-[#9D3030] text-left'>{inputErrorList.user_profile?.reporting_to}</span>

            </div>
            <div className='flex-1'>
              <InputFiledWC
                className='pl-3 py-[9px] appearance-none border-[1px] border-[#9d9c9c] w-full focus:outline-none focus:bg-white focus:border-[#2e6da4]'
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
                {imagePreview && <img src={imagePreview} className='w-[30px] h-[30px]' />}
                </>
                :
                <>
                {currentPhoto && <img src={currentPhoto} className='w-[30px] h-[30px]' />}
                </>
                }

            </div>
          </div>
        </div>

        <div className="my-2">
          <Checkbox
            type='checkbox'
            checked={formData.user_profile.is_department_head}
            onChange={handleChange}
            name='is_department_head'
            id='is_department_head'
            label='Is department head?'
            isRequired={false}
            placeholder='is_department_head?'
          />
        </div>
        <div className="my-2">
          <Checkbox
            type='checkbox'
            checked={formData.is_active}
            onChange={handleChange}
            name='is_active'
            id='is_active'
            label='Is active?'
            isRequired={false}
            placeholder='status'
          />
        </div>
        <div className="my-2">
          <Checkbox
            type='checkbox'
            checked={formData.is_superuser}
            onChange={handleChange}
            name='is_superuser'
            id='is_superuser'
            label='Is superuser?'
            isRequired={false}
            placeholder='Is superuser'
          />
        </div>
      </div>


      <div className='mt-5 '>
        <FormPageTitle title='User Permissions' FormPageRightSideButtonURL='' LinkName='' />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 shadow-xl p-3">
          {Object.keys(groupedPermissions).map((model) => (
            <div key={model} className='flex-shrink-0 my-4 w-full md:w-auto'>
              <div className="permissions-grid">
                <div className="model-group">
                  <div className="model-name capitalize">
                    <CheckboxPermissionModel
                      type='checkbox'
                      id={`model_${model}`}

                      label={model
                        .split('_')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')
                      } // Apply the same transformation to the label

                      checked={groupedPermissions[model].every(permission =>
                        formData.user_permissions.includes(permission.id)
                      )}
                      onChange={() => handleModelPermissionChange(model)}
                    />
                  </div>
                  <div className="flex flex-col ml-5">
                    {groupedPermissions[model].map((permission) => (
                      <div key={permission.id} className="permission-item capitalize text-[13px]">
                        <CheckboxPermissions
                          type='checkbox'
                          checked={formData.user_permissions.includes(permission.id)}
                          onChange={() => handlePermissionChange(permission.id)}
                          name='user_permissions'
                          id={`permission_${permission.id}`}
                          label={permission.name}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {hasPermission('add_user') && (
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

export default UserFormComponents