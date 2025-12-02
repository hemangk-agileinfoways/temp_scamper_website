import axiosInstance from './axios';

// API Response Types
export interface CoursePrice {
  id: number;
  price: number;
  tenure: string; // 'monthly' | 'yearly'
}

export interface CourseListItem {
  id: number;
  name: string;
  grades: string;
  chapter_count: number;
  course_prices: CoursePrice[];
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface CourseChapter {
  chapter_id: number;
  course_id: number;
  is_selected: boolean;
  name: string;
  thumbnail: string;
  lesson_count: number;
  is_active: boolean;
}

export interface CourseDetail {
  course_id: number;
  course_name: string;
  grades: string;
  description: string;
  sphero: string;
  durable_link: string;
  prices: CoursePrice[];
  chapters: CourseChapter[];
}

// API Functions
export const fetchAllCourses = async (): Promise<CourseListItem[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<CourseListItem[]>>('/course/findAll');
    
    // Extract data from response
    const responseData = response.data?.data;
    
    // Return empty array if data is null, undefined, or not an array
    if (!responseData || !Array.isArray(responseData) || responseData.length === 0) {
      return [];
    }
    
    return responseData;
  } catch (error) {
    console.error('Error fetching courses:', error);
    // Return empty array on error
    return [];
  }
};

export const fetchCourseDetails = async (id: number): Promise<CourseDetail | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<CourseDetail>>(`/course/view/${id}`);
    
    // Extract data from response
    const responseData = response.data?.data;
    
    // Return null if data is null, undefined, or empty
    if (!responseData) {
      return null;
    }
    
    return responseData;
  } catch (error) {
    console.error(`Error fetching course details for id ${id}:`, error);
    // Return null on error
    return null;
  }
};


