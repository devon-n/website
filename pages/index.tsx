import { useRef } from 'react'
import Head from 'next/head'
import { Box, Text, Flex, Button } from '@chakra-ui/react'

import SignupForm from '@/components/SIgnupForm'
import ModalBox from '../components/ModalBox'
import { roboto } from '@/theme/fonts'
import { Header } from '@/components/Header'
import { GUTTER_PX } from '@/theme/constants'

export default function Home() {
  const modalBoxContent = [
    {
      title: 'Unparalleled Decentralization',
      paragraph:
        'Our EVM Rollup solution takes decentralization to new heights, surpassing other Layer 2 (L2) solutions in the market. By harnessing the power of the Tezos blockchain, we ensure that your applications and app-chains remain truly decentralized, transparent, and resilient.'
    },
    {
      title: 'Versatility and Flexibility',
      paragraph:
        "Whether you're envisioning an open decentralized platform or a private app-chain, Etherlink provides the perfect foundation. With its versatile architecture, you can create tailored solutions that fit your unique business requirements and user needs."
    },
    {
      title: 'Scalability and Speed',
      paragraph:
        "Leave scalability concerns behind as Etherlink leverages the Tezos network's inherent scalability. Enjoy lightning-fast transaction processing and a seamless user experience, enabling you to handle high volumes of transactions with ease."
    }
  ]

  const signupRef: React.RefObject<HTMLInputElement> = useRef(null)

  return (
    <>
      <Head>
        <title>Etherlink</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Flex
        flexDir='column'
        minH={['0px', null,'100vh']}
        pb={['73px', null,'0px']}
        backgroundImage='/bg-upper.jpg'
        backgroundPosition={['-350px', '-200px', '-500px', '0px']}
        backgroundSize='cover'
      >
        <Header px={['16px', null, '80px']} />
        <Flex
          alignItems='center'
          grow={1}
          direction={['column', null, 'column', 'row']}
          px={GUTTER_PX}
          pt={['50px', null, '80px', "0px"]}
        >
          <Box maxW='640px' >
            <Text
              fontSize={['30px', '50px', '60px', '85px']}
              maxW='530px'
              lineHeight='110%'
              fontWeight={450}
            >
              The Future <br /> of Ethereum <br /> L2 Solutions
            </Text>
            <Text
              fontSize={{ base: '16px', md: '20px', lg: '20px', xl: '24px' }}
              mt={['12px', '32px', '24px']}
              className={roboto.className}
            >
              Built on the robust Tezos blockchain, Etherlink empowers
              businesses and developers to create a new era of open, secure, and
              scalable applications.
            </Text>
          </Box>
          <Box flex={[0, 0, 0.5, 1]} minH='32px' minW={'32px'} />
          <SignupForm signupRef={signupRef} />
        </Flex>
      </Flex>

      <Box
        pt={{ base: '60px', md: '80px', xl: '104px' }}
        pb={{ base: '80px', md: '130px', xl: '164px' }}
        bg='#04001C'
        px={GUTTER_PX}
      >
        <Text
          align='center'
          fontSize={{ base: '24px', md: '32px', xl: '48px' }}
          color='white'
          mb='20px'
        >
          Why Choose Etherlink?
        </Text>
        <Text
          align='center'
          fontSize={{ base: '16px', md: '20px', xl: '24px' }}
          color='white'
        >
          Be at the forefront of decentralized innovation
        </Text>
        <Flex
          justify='space-around'
          wrap='wrap'
          gap='20px'
          mt={{ base: '40px', md: '60px', xl: '80px' }}
        >
          {modalBoxContent?.map((content, index) => (
            <ModalBox
              minW='232px'
              flex={1}
              key={index}
              title={content.title}
              paragraph={content.paragraph}
            />
          ))}
        </Flex>
      </Box>

      <Box 
        pt='80px' 
        backgroundImage='/bg-bottom.jpg'
        backgroundPosition={['-500px', '-100px', '0px']}
        backgroundSize='cover'
      >
        <Flex
          direction='column'
          align='center'
          p={{
            base: '50px 16px 150px 16px',
            md: '75px 50px 175px 50px',
            xl: '100px 90px 200px 90px'
          }}
        >
          <Text
            fontWeight='450'
            fontSize={{ base: '28px', md: '45px', xl: '60px' }}
            align='center'
          >
            Join the Etherlink <br /> Revolution
          </Text>
          <Text
            fontSize={{ base: '14px', md: '20px', xl: '24px' }}
            w={{ base: '350px', md: '610px', xl: '710px' }}
            mt='20px'
            className={roboto.className}
            lineHeight='135%'
          >
            Together, let's shape the future of decentralized applications and
            unleash the true power of the Tezos blockchain. Enter your email
            above and be the first to know when Etherlink goes live.
          </Text>
          <Button
            bg='#0000ff'
            color='#FFFFFF'
            p='12px 40px'
            mt='20px'
            borderRadius='75px'
            onClick={() => signupRef.current?.focus()}
            _hover={{ bg: '#0000b3' }}
          >
            Sign up
          </Button>
        </Flex>
        <Text
          fontSize={{ base: '16px', xl: '18px' }}
          p='50px 0px 20px 15px'
          className={roboto.className}
        >
          © Etherlink 2023
        </Text>
      </Box>
    </>
  )
}
