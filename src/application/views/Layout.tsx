import React, { ReactNode, useEffect, useMemo } from 'react';
import { Box, Flex, Heading } from '@radix-ui/themes';
import { useStateStore } from '../store';
import TxtIcon from '../assets/txt.png'
import TableIcon from '../assets/excel.png'
import ImgIcon from '../assets/img.png'
import PdfIcon from '../assets/pdf.png'
import WordIcon from '../assets/word.png'
import PptIcon from '../assets/ppt.png'
import { Cross2Icon, SizeIcon } from '@radix-ui/react-icons';
const typeIcons: { [key: string]: string } = {
  table: TableIcon,
  img: ImgIcon,
  pdf: PdfIcon,
  ppt: PptIcon,
  txt: TxtIcon,
  word: WordIcon
}
interface ILayout {
  children?: ReactNode
  handleEmmit?: (type: string) => any
}
const Layout = ({ children, handleEmmit }: ILayout) => {
  const { appState } = useStateStore()

  const { currentIcon, currentHeading } = useMemo(() => {
    const icon = typeIcons[appState.file_form] || TxtIcon; // 默认图标为 TxtIcon
    const heading = decodeURIComponent(appState.file_name || '文件名'); // 解码文件名
    // const heading = appState.file_name || '文件名'; // 默认标题为 '文件名'
    return { currentIcon: icon, currentHeading: heading };
  }, [appState.file_form, appState.file_name]);

  const userHandler = (type: string) => {
    handleEmmit && handleEmmit(type)
  }
  return (
    <Box className='h-full relative' >
      <Flex direction="column" className='h-full'>
        <Box width={'100%'} height={'40px'} className='relative z-10 px-4 bg-white shadow '>
          <Flex align={'center'} justify={'between'} className=" h-full w-full    ">
            <Flex justify={'start'} gap={'2'}>
              <img src={currentIcon} alt={`icon`} className="h-5 w-5" />
              <div className="overflow-hidden whitespace-nowrap text-ellipsis" style={{ maxWidth: '350px' }}>
                <Heading size={'3'}>{currentHeading}</Heading>
              </div>
            </Flex>
            <Flex gap={'3'}>
              {/* <SizeIcon cursor={'pointer'}  /> */}
              <Cross2Icon cursor={'pointer'} onClick={() => userHandler('close')} />
            </Flex >
          </Flex>
        </Box>
        <Box as="div" className=" w-full" style={{ background: "var(--gray-2)", height: `calc(100% - 40px)` }}>
          {children}
        </Box>
        {/* <Flex align={'center'} justify={'center'} as="div" className="h-[50px] bg-gray-200 flex items-center justify-center">
          页脚内容
        </Flex> */}
      </Flex >

    </Box >
  );
};

export default Layout;