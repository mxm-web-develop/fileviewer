import { ReactNode, useMemo } from 'react';
import { Box, Flex, Heading } from '@radix-ui/themes';
import { useStateStore } from '../store';
import TxtIcon from '../assets/txt.png';
import TableIcon from '../assets/excel.png';
import ImgIcon from '../assets/img.png';
import PdfIcon from '../assets/pdf.png';
import WordIcon from '../assets/word.png';
import PptIcon from '../assets/ppt.png';
import { cn } from '@udecode/cn'
import { Cross2Icon, SizeIcon, PlusCircledIcon, MinusCircledIcon } from '@radix-ui/react-icons';
const typeIcons: { [key: string]: string } = {
  csv: TableIcon,
  xls: TableIcon,
  xlsx: TableIcon,
  jpeg: ImgIcon,
  jpg: ImgIcon,
  png: ImgIcon,
  pdf: PdfIcon,
  ppt: PptIcon,
  txt: TxtIcon,
  docx: WordIcon,
  doc: WordIcon,
};
interface ILayout {
  children?: ReactNode;
  pageBar?: ReactNode;
  handleEmmit?: (type: string) => any;
  handleEvent?: (type: string) => any;
}
const Layout = ({ children, handleEmmit, pageBar, handleEvent }: ILayout) => {
  const { appState } = useStateStore();
  const d = appState.data[appState.page_manager.current - 1];
  const { currentIcon, currentHeading } = useMemo(() => {
    const icon = typeIcons[appState.parse_form] || TxtIcon;
    const heading = decodeURIComponent(d?.file_name || '文件名');
    return { currentIcon: icon, currentHeading: heading };
  }, [appState.data, appState.page_manager]);

  const userHandler = (type: string) => {
    handleEmmit && handleEmmit(type);
  };
  return (
    <Box className="h-full relative">
      <Flex direction="column" className="h-full">
        <Box width={'100%'} height={'40px'} className="relative z-10 px-4 bg-white shadow ">
          <Flex align={'center'} justify={'between'} className=" h-full w-full    ">
            <Flex justify={'start'} gap={'2'}>
              <img src={currentIcon} alt={`icon`} className="h-5 w-5" />
              <div
                className="overflow-hidden  text-ellipsis break-words line-clamp-1"
                style={{ maxWidth: '350px' }}
              >
                <Heading size={'3'}>{currentHeading}</Heading>
              </div>
            </Flex>
            <Flex gap={'3'}>
              {/* <SizeIcon cursor={'pointer'}  /> */}

              {/* <PlusCircledIcon
                cursor={'pointer'}
                onClick={() => handleEvent && handleEvent('plus')}
              />
              <MinusCircledIcon
                cursor={'pointer'}
                onClick={() => handleEvent && handleEvent('minus')}
              /> */}
              <Cross2Icon cursor={'pointer'} onClick={() => userHandler('close')} />
            </Flex>
          </Flex>
        </Box>
        <div
          className=" relative"
          style={{ background: 'var(--gray-2)', height: `calc(100% - 40px)` }}
        >
          <div className={cn(" h-full w-full relative", {
            'justify-center items-center': !Array.isArray(appState.data)
          })}>
            {Array.isArray(appState.data) && pageBar}

            {children}
          </div>
        </div>
        {/* <Flex align={'center'} justify={'center'} as="div" className="h-[50px] bg-gray-200 flex items-center justify-center">
          页脚内容
        </Flex> */}
      </Flex>
    </Box>
  );
};

export default Layout;
