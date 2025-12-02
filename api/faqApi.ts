import axiosInstance from './axios';
import { ApiResponse } from './courseApi';

// FAQ API Types
export interface FAQListPayload {
  search?: string;
  faq_category_id?: number;
  type: 'school' | 'student' | 'teacher';
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface UpdatedUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface FAQCategory {
  id: number;
  name: string;
}

export interface FAQItem {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  faq_category_id: number;
  faqs_for: string[];
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  updated_user: UpdatedUser;
  faq_category: FAQCategory;
}

export interface FAQListData {
  faqs_list: FAQItem[];
  total_records: number;
}

// Connect Us API Types
export interface ConnectUsPayload {
  name: string;
  email: string;
  subject: string;
  description: string;
}

export interface ConnectUsResponse {
  id: number;
  name: string;
  email: string;
  subject: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// API Function
export const fetchFAQList = async (
  payload: FAQListPayload
): Promise<{ faqs: FAQItem[]; totalRecords: number }> => {
  try {
    const response = await axiosInstance.post<ApiResponse<FAQListData>>('/faq/list', payload);

    // Extract data from response
    const responseData = response.data?.data;

    // Return empty array if data is null, undefined, or faqs_list is invalid
    if (!responseData || !Array.isArray(responseData.faqs_list)) {
      return { faqs: [], totalRecords: 0 };
    }

    // Filter out deleted or inactive FAQs
    const activeFAQs = responseData.faqs_list.filter(
      (faq) => faq.is_active && !faq.is_deleted
    );

    return {
      faqs: activeFAQs,
      totalRecords: responseData.total_records || 0
    };
  } catch (error) {
    console.error('Error fetching FAQ list:', error);
    // Return empty array on error
    return { faqs: [], totalRecords: 0 };
  }
};

// Connect Us API Function
export const submitConnectUs = async (
  payload: ConnectUsPayload
): Promise<{ success: boolean; message: string; data?: ConnectUsResponse }> => {
  try {
    const response = await axiosInstance.post<ApiResponse<ConnectUsResponse>>(
      '/faq/connect-us',
      payload
    );

    return {
      success: true,
      message: response.data.message || 'Your message has been sent successfully. We will get back to you soon.',
      data: response.data.data
    };
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';
    return {
      success: false,
      message: errorMessage
    };
  }
};

// School Register API Types
export interface SchoolRegisterPayload {
  admin_name: string;
  admin_phone: string;
  admin_email: string;
  district: string;
  name: string;
  website: string;
  address: string;
  total_teachers: number;
  total_students: number;
}

export interface SchoolRegisterResponse {
  id: number;
  name: string;
  admin_name: string;
  admin_email: string;
  admin_phone: string;
  district: string;
  address: string;
  website: string;
  total_teachers: number;
  total_students: number;
  status: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

// School Register API Function
export const submitSchoolRegister = async (
  payload: SchoolRegisterPayload
): Promise<{ success: boolean; message: string; data?: SchoolRegisterResponse }> => {
  try {
    const response = await axiosInstance.post<ApiResponse<SchoolRegisterResponse>>(
      '/school/register',
      payload
    );

    return {
      success: true,
      message: response.data.message || 'Your school registration has been submitted successfully. We will review and get back to you soon.',
      data: response.data.data
    };
  } catch (error: any) {
    console.error('Error submitting school registration:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';
    return {
      success: false,
      message: errorMessage
    };
  }
};

