from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import time
import sys
input1, input2 = sys.argv[1:]
try:
    op = webdriver.ChromeOptions()
    op.add_argument('headless')
    driver = webdriver.Chrome(options=op)
    driver.get('https://amritavidya.amrita.edu:8444/cas/login?service=https%3A%2F%2Famritavidya.amrita.edu%3A8444%2Faums%2FJsp%2FCore_Common%2Findex.jsp%3Ftask%3Doff')

    time.sleep(2)

    username = driver.find_element_by_id('username')
    username.send_keys(input1)

    password = driver.find_element_by_id('password')
    password.send_keys(input2)
    time.sleep(2)
    username.submit()

    time.sleep(2)

    iframe = driver.find_element_by_xpath("//iframe[@name='maincontentframe']")
    driver.switch_to.frame(iframe)
    iframe = driver.find_element_by_xpath("//iframe[@name='Iframe1']")
    driver.switch_to.frame(iframe)
    
    menu = driver.find_element_by_id('container')
    menu = menu.find_element_by_id('toolMenu')
    elem = menu.find_element_by_class_name('icon-sakai-rsf-evaluation')
    elem.click()
    time.sleep(2)
    
    menu = driver.find_element_by_id('container')
    iframe = driver.find_elements_by_tag_name('iframe')[0]
    driver.switch_to.frame(iframe)
    table = driver.find_element_by_class_name('innerPanel')
    
    for j in range(50):
        try:
            elem = driver.find_elements_by_xpath("//a[@href]")[1]
            elem.click()
            time.sleep(2)
            driver.find_element_by_name('eval_form')
            actions = ActionChains(driver) 
            actions.send_keys(Keys.TAB * 7)
            for i in range(15):
                actions.send_keys(Keys.SPACE)
                actions.send_keys(Keys.TAB)
                #actions.send_keys(Keys.ENTER)
                actions.perform()
            time.sleep(2)
        except:
            break
        
    
    driver.close()
    
    print('Success')

except:
    print('Failure')
    pass
