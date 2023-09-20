import { Title } from '../title';

interface FormContainerProps {
  children: React.ReactNode;
  title?: string;
  footPageText?: JSX.Element;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FormContainer = ({
  children,
  title,
  footPageText,
  onSubmit,
}: FormContainerProps) => {
  return (
    <div className='flex flex-col justify-center w-full h-screen max-w-md p-10 mx-auto rounded-md bg-stone-800'>
      <Title className='text-4xl text-center'>{title}</Title>
      <form
        className='pt-6 pb-8 mb-4 align-middle rounded shadow-md bg-stone-8080'
        onSubmit={onSubmit}
      >
        {children}
      </form>
      {footPageText}
    </div>
  );
};

export default FormContainer;
