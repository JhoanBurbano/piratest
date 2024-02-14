import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import { PinUploaded } from '../../../interfaces/pin.interface';
import { Button, Chip, Image, Input } from '@nextui-org/react';
import classNames from 'classnames';
import { useAppDispatch } from '../../../hooks/state.hooks';
import { createNewPost } from '../../../store/thunks/pin.thunk';

const CreatePin = () => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLImageElement>(null);
  const [src, setSrc] = useState<string>();
  const [imgError, setImgError] = useState<string>('');
  const [file, setFile] = useState<File>();
  const { control, handleSubmit, formState, setValue, watch } = useForm<
    Omit<PinUploaded, 'id' | 'img' | 'userName' | 'userProfile'>
  >({
    defaultValues: {
      tags: [],
      downloads: 0,
      likes: 0,
      views: 0,
      createdAt: new Date(),
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('acc :>> ', acceptedFiles, URL.createObjectURL(acceptedFiles[0]));
    setFile(acceptedFiles.at(0));
    setSrc(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
    onDrop,
    multiple: false,
    maxFiles: 1,
  });

  const handleImageLoad = () => {
    if (ref.current) {
      setValue('width', ref.current.width),
        setValue('height', ref.current.height),
        console.log({
          width: ref.current.width,
          height: ref.current.height,
        });
    }
  };

  const handleClose = (tag: string) => {
    setValue(
      'tags',
      watch('tags').filter((t) => t !== tag),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      setValue('tags', watch('tags').splice(watch('tags').length - 1, 1));
    }
  };

  const onSubmit = () => {
    if (!file || !src) {
      setImgError('Image is required');
      return;
    }
    handleSubmit(async (data) => {
      console.log('data>', data, file, formState.isValid);
      dispatch(createNewPost({ file: file!, data }));
    })();
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center gap-4 lg:px-[20%]">
      <h2 className="text-3xl font-bold text-center">Create a new pin</h2>
      {src ? (
        <>
          <Image src={src} alt="image to upload" ref={ref} onLoad={handleImageLoad} />
          <Button onClick={() => setSrc(undefined)} variant="light" color="danger">
            Change Image
          </Button>
        </>
      ) : (
        <>
          <span
            {...getRootProps()}
            className={classNames(
              'w-full h-[500px] bg-gray-100 rounded-lg border-dashed border-2 border-red-300 flex flex-col gap-2 items-center justify-center transition-colors',
              { 'bg-red-300 border-red-700': isDragActive },
            )}
          >
            <input {...getInputProps()} />
            <span className="text-7xl">
              <i className="fa-solid fa-upload fa-bounce"></i>
            </span>
            {isDragActive ? <p>Drop files here</p> : <p>Chosee a file and drag here to upload</p>}
          </span>
          <h3 className="text-red-600">{imgError}</h3>
        </>
      )}
      <section className="flex-1 flex flex-col gap-4 w-full">
        <h3 className="text-2xl font-bold">Tags</h3>
        <p>
          Enter the tags for your Pin, separate them by commas, and you can delete them with Delete
          or Backspace or directly from their own tag.
        </p>
        <Controller
          name="tags"
          rules={{
            required: 'Tags is required.',
            validate: (value) => !!value.length || 'Tags must have one tag minimum',
          }}
          control={control}
          render={({ field, fieldState }) => (
            <span className="md:flex items-end gap-4">
              <Input
                type="tags"
                label="Tags"
                variant="bordered"
                labelPlacement="outside"
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
                onValueChange={(value) =>
                  field.onChange([...new Set(value.split(',').map((tag) => tag.trim()))])
                }
                onKeyDown={handleKeyDown}
                value={field.value.join(', ')}
                defaultValue={field.value.join(', ')}
                className=" md:w-[300px]"
                classNames={{
                  inputWrapper: 'rounded-md border border-zinc-300 bg-zinc-100',
                  input: 'leading-loose block',
                  label: 'text-zinc-300',
                }}
              />
              <span className="flex gap-2 bg-gray-100 flex-1 h-[65%] rounded-lg items-center p-2">
                {field.value.map((t, i) =>
                  t?.length ? (
                    <Chip
                      color="danger"
                      variant="flat"
                      className="text-xs"
                      key={i}
                      onClose={() => handleClose(t)}
                    >
                      {t}
                    </Chip>
                  ) : null,
                )}
              </span>
            </span>
          )}
        />
        <Button onClick={onSubmit} className="bg-red-600 text-white">
          Submit
        </Button>
      </section>
    </div>
  );
};

export default CreatePin;
