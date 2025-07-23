import React, { useEffect, useState } from 'react';
import Deashboard from '../component/Deashboard';
import { Plus } from 'lucide-react';
import Categorylist from '../component/Categorylist';
import axiosConfig from '../utill/axiosConfig';
import { API_ENDPOINT } from '../utill/apiEndpoint';
import { toast } from 'react-toastify';
import Model from '../component/Model ';
import Addcategoryform from '../component/Addcategoryform';

export default function Category() {
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await axiosConfig.get(API_ENDPOINT.GET_ALL_CATEGORY);
            if (res.status === 200) {
                setCategoryData(res.data);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const handleAddCategory = async (category) => {
        const { name, type, icon } = category;
        if (!name.trim()) {
            toast.error('Name is required');
            return;
        }
        try {
            const res = await axiosConfig.post(API_ENDPOINT.ADD_CATEGORY, { name, type, icon });
            if (res.status === 200) {
                toast.success('Category added successfully');
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    const handleEditCategory = (categoryToEdit) => {
        setSelectedCategory(categoryToEdit);
        setOpenEditCategoryModal(true);
    };

    const handleUpdateCategory = async (category) => {
        try {
            const res = await axiosConfig.put(`${API_ENDPOINT.UPDATE_CATEGORY}/${selectedCategory.id}`, category);
            if (res.status === 200) {
                toast.success('Category updated successfully');
                setOpenEditCategoryModal(false);
                setSelectedCategory(null);
                fetchCategoryDetails();
            }
        } catch (error) {
            toast.error('Failed to update category');
        }
    };

    return (
        <Deashboard activeMenu="Category">
            <div className="my-5 mx-auto">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">All Categories</h2>
                    <button
                        onClick={() => setOpenAddCategoryModal(true)}
                        className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-4 py-2 text-sm flex items-center gap-2 transition"
                    >
                        <Plus size={15} />
                        Add Category
                    </button>
                </div>

                <Categorylist category={categoryData} onEditCategory={handleEditCategory} />

                <Model
                    title="Add Category"
                    isopen={openAddCategoryModal}
                    onClose={() => setOpenAddCategoryModal(false)}
                >
                    <Addcategoryform onAddCategory={handleAddCategory} />
                </Model>

                <Model
                    title="Update Category"
                    isopen={openEditCategoryModal}
                    onClose={() => {
                        setOpenEditCategoryModal(false);
                        setSelectedCategory(null);
                    }}
                >
                    <Addcategoryform onAddCategory={handleUpdateCategory} initialData={selectedCategory} />
                </Model>
            </div>
        </Deashboard>
    );
}
