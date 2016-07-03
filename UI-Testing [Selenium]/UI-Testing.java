package com.example.tests;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class UITesting {
  private WebDriver driver;
  private String baseUrl;
  private boolean acceptNextAlert = true;
  private StringBuffer verificationErrors = new StringBuffer();

  @Before
  public void setUp() throws Exception {
    driver = new FirefoxDriver();
    baseUrl = "127.0.0.1:8080";
    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
  }

  @Test
  public void testUITesting() throws Exception {
    // Side Menu Resources
    driver.findElement(By.cssSelector("i.ion-navicon-round")).click();
    driver.findElement(By.cssSelector("body.ng-scope")).click();
    // Autocomplete Search
    driver.findElement(By.xpath("//input[@type='text']")).sendKeys("l");
    driver.findElement(By.xpath("//input[@type='text']")).sendKeys("u");
    driver.findElement(By.xpath("//input[@type='text']")).sendKeys("k");
    driver.findElement(By.xpath("//input[@type='text']")).sendKeys("e");
    driver.findElement(By.xpath("//input[@type='text']")).clear();
    driver.findElement(By.xpath("//input[@type='text']")).sendKeys("");
    // Go to Next Page
    driver.findElement(By.cssSelector("div.next")).click();
    for (int second = 0;; second++) {
    	if (second >= 60) fail("timeout");
    	try { if (isElementPresent(By.xpath("//li/div/div[2]"))) break; } catch (Exception e) {}
    	Thread.sleep(1000);
    }

    // Click List Element
    driver.findElement(By.xpath("//li")).click();
    for (int second = 0;; second++) {
    	if (second >= 60) fail("timeout");
    	try { if (isElementPresent(By.linkText("Attack of the Clones"))) break; } catch (Exception e) {}
    	Thread.sleep(1000);
    }

    driver.findElement(By.linkText("Attack of the Clones")).click();
    for (int second = 0;; second++) {
    	if (second >= 60) fail("timeout");
    	try { if (isElementPresent(By.xpath("//li/div/div[2]"))) break; } catch (Exception e) {}
    	Thread.sleep(1000);
    }

    // Back View
    driver.findElement(By.cssSelector("i.ion-android-arrow-back")).click();
    for (int second = 0;; second++) {
    	if (second >= 60) fail("timeout");
    	try { if (isElementPresent(By.linkText("Tatooine"))) break; } catch (Exception e) {}
    	Thread.sleep(1000);
    }

    driver.findElement(By.linkText("Tatooine")).click();
    driver.findElement(By.cssSelector("img.img-responsive.center-block")).click();
  }

  @After
  public void tearDown() throws Exception {
    driver.quit();
    String verificationErrorString = verificationErrors.toString();
    if (!"".equals(verificationErrorString)) {
      fail(verificationErrorString);
    }
  }

  private boolean isElementPresent(By by) {
    try {
      driver.findElement(by);
      return true;
    } catch (NoSuchElementException e) {
      return false;
    }
  }

  private boolean isAlertPresent() {
    try {
      driver.switchTo().alert();
      return true;
    } catch (NoAlertPresentException e) {
      return false;
    }
  }

  private String closeAlertAndGetItsText() {
    try {
      Alert alert = driver.switchTo().alert();
      String alertText = alert.getText();
      if (acceptNextAlert) {
        alert.accept();
      } else {
        alert.dismiss();
      }
      return alertText;
    } finally {
      acceptNextAlert = true;
    }
  }
}
