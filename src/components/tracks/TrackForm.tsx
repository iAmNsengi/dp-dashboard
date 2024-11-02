import React, { useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { Track } from "../../types";

interface TrackFormProps {
  initialData?: Partial<Track>;
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading: boolean;
}

export const TrackForm: React.FC<TrackFormProps> = ({
  initialData = {},
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    featuring: initialData.featuring || "",
    releaseDate: initialData.releaseDate
      ? new Date(initialData.releaseDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(
    initialData.coverImage || null
  );

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    if (coverImage) submitData.append("coverImage", coverImage);

    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Track Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <Input
          label="Featuring Artists"
          value={formData.featuring}
          onChange={(e) =>
            setFormData({ ...formData, featuring: e.target.value })
          }
          placeholder="e.g. Artist1, Artist2"
        />

        <Input
          type="date"
          label="Release Date"
          value={formData.releaseDate}
          onChange={(e) =>
            setFormData({ ...formData, releaseDate: e.target.value })
          }
          required
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Cover Image
          </label>
          <div className="mt-1 flex items-center space-x-4">
            {coverPreview && (
              <img
                src={coverPreview}
                alt="Cover preview"
                className="h-32 w-32 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="w-full"
                required={!initialData.coverImage}
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommended size: 1000x1000px. Max size: 2MB
              </p>
            </div>
          </div>
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
          {initialData._id ? "Update Track" : "Upload Track"}
        </Button>
      </div>
    </form>
  );
};
