import React, { useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { Merchandise, MERCHANDISE_CATEGORIES } from "../../types";
import { Image } from "../common/Image";

interface MerchandiseFormProps {
  initialData?: Partial<Merchandise>;
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading: boolean;
}

export const MerchandiseForm: React.FC<MerchandiseFormProps> = ({
  initialData = {},
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    price: initialData.price || 0,
    category: initialData.category || "",
    stockCount: initialData.totalStock || 0,
  });

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = new FormData();

    // Append basic fields
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value.toString());
    });

    // Append images
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        submitData.append("images", file);
      });
    }

    console.log(Object.fromEntries(submitData.entries()));

    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          >
            <option value="">Select a category</option>
            {MERCHANDISE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <Input
          type="number"
          label="Price"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
          min="0"
          step="0.01"
          required
        />

        <Input
          type="number"
          label="Stock Count"
          value={formData.stockCount}
          onChange={(e) =>
            setFormData({ ...formData, stockCount: Number(e.target.value) })
          }
          min="0"
          required
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="mt-1 block w-full"
            onChange={(e) => setSelectedFiles(e.target.files)}
            required={!initialData._id}
          />
          {initialData.images && initialData.images.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-4">
              {initialData.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="h-24 w-24 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {initialData._id ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
};
