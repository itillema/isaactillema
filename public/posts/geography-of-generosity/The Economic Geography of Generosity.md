

# The Geography of Generosity

## A Regression Analysis of Neighborhood Socioeconomics and Taxi Tipping Behavior in Chicago

Isaac Tillema

Published 11/19/2025

# Abstract {#abstract}

This report presents a comprehensive regression analysis of the factors influencing taxi tipping behavior in Chicago, specifically isolating the impact of neighborhood socioeconomic status on driver compensation. While tipping constitutes a critical portion of service worker income, the specific drivers of generosity, beyond the cost of the service itself, remain largely opaque. Utilizing a massive public dataset of Chicago Taxi Trips spanning a decade (2013–2023) merged with socioeconomic data from the American Community Survey (ACS), this study investigates whether a measurable "geography of generosity" exists within the city.

The methodology employed rigorous data preprocessing, including the removal of outliers and the feature engineering of an *Estimated Mean Income* variable derived from binned census counts. To satisfy the assumptions of linear regression, the highly right-skewed target variable (Tip Percentage) was log-transformed. A Multiple Linear Regression (MLR) model was constructed to test the central hypothesis, controlling for significant confounding variables such as trip fare, trip duration, day of the week, and hour of the day. Model validity was confirmed through Variance Inflation Factor (VIF) testing to rule out multicollinearity and an 80/20 train-test split validation, which yielded a Root Mean Squared Error (RMSE) of 1.61.

The analysis confirms a statistically significant positive relationship (p \< 2.2e-16) between a neighborhood's estimated mean income and the average tip percentage, holding all other factors constant. Furthermore, a residual analysis was conducted to calculate a "generosity score" for each of Chicago’s 77 community areas, identifying neighborhoods that consistently tip above or below the model’s predictions. These findings provide data-driven evidence that geography and local economic conditions are significant, independent predictors of economic behavior in the transportation sector.

# Table of Contents {#table-of-contents}

[Abstract	1](#abstract)

[Table of Contents	2](#table-of-contents)

[Introduction	4](#introduction)

[Background	4](#background)

[Problem Statement	4](#problem-statement)

[Research Questions	4](#research-questions)

[Central Hypothesis	5](#central-hypothesis)

[Report Structure	5](#report-structure)

[Data & Methodology	6](#data-&-methodology)

[Data Sources	6](#data-sources)

[Data Acquisition and Integration	6](#data-acquisition-and-integration)

[Data Cleaning and Preprocessing	7](#data-cleaning-and-preprocessing)

[Feature Engineering	7](#feature-engineering)

[The Target Variable: Tip Percentage	7](#the-target-variable:-tip-percentage)

[The Socioeconomic Predictor: Estimated Mean Income	8](#the-socioeconomic-predictor:-estimated-mean-income)

[Time-Based Covariates	8](#time-based-covariates)

[Variable Transformation for Modeling	8](#variable-transformation-for-modeling)

[Handling Outliers	8](#handling-outliers)

[Log-Transformation of the Target	9](#log-transformation-of-the-target)

[Factorization	10](#factorization)

[Software and Performance Optimization	10](#software-and-performance-optimization)

[Exploratory Data Analysis	11](#exploratory-data-analysis)

[Univariate Analysis	11](#univariate-analysis)

[Bivariate Analysis: Testing the Central Hypothesis	11](#bivariate-analysis:-testing-the-central-hypothesis)

[Investigating Confounding Variables	12](#investigating-confounding-variables)

[The "Weekend Effect"	12](#the-"weekend-effect")

[The Fare-Tip Relationship	13](#the-fare-tip-relationship)

[Diagnosing Modeling Pitfalls: Multicollinearity	14](#diagnosing-modeling-pitfalls:-multicollinearity)

[Regression Modeling & Results	15](#regression-modeling-&-results)

[Model 1: Simple Linear Regression (SLR)	15](#model-1:-simple-linear-regression-\(slr\))

[Model 2: Multiple Linear Regression (MLR)	16](#model-2:-multiple-linear-regression-\(mlr\))

[Model Diagnostics: Multicollinearity (VIF Test)	16](#model-diagnostics:-multicollinearity-\(vif-test\))

[Model Validation (Train/Test Split)	17](#model-validation-\(train/test-split\))

[Analysis & Interpretation of Findings	19](#analysis-&-interpretation-of-findings)

[Final Model Diagnostic Checks	19](#final-model-diagnostic-checks)

[Residual Analysis	19](#residual-analysis)

[Answering the Research Questions	20](#answering-the-research-questions)

[The Significance of Socioeconomic Status	20](#the-significance-of-socioeconomic-status)

[Quantifying the "Price of Generosity"	20](#quantifying-the-"price-of-generosity")

[The Geography of Generosity	21](#the-geography-of-generosity)

[The "Least Generous" Anomalies	21](#the-"least-generous"-anomalies)

[The "Most Generous" Neighborhoods	22](#the-"most-generous"-neighborhoods)

[Conclusion	24](#conclusion)

[Summary of Findings	24](#summary-of-findings)

[Limitations of the Research	24](#limitations-of-the-research)

[Future Work	25](#future-work)

[Concluding Remarks	25](#concluding-remarks)

[Appendices	27](#appendices)

[Appendix A: Complete R Script	27](#appendix-a:-complete-r-script)

[Appendix B: Data Dictionary	31](#appendix-b:-data-dictionary)

[Appendix C: Model Summaries	33](#appendix-c:-model-summaries)

[C.1  Model 1: Simple Linear Regression Results	33](#c.1-model-1:-simple-linear-regression-results)

[C.2  Model 2: Multiple Linear Regression Results	34](#c.2-model-2:-multiple-linear-regression-results)

[C.3  Model 3: Multiple Linear Regression Results (Interaction Model)	35](#c.3-model-3:-multiple-linear-regression-results-\(interaction-model\))

[C.4  Model 4: Multiple Linear Regression Results (Final Training Model)	36](#c.4-model-4:-multiple-linear-regression-results-\(final-training-model\))

[Appendix D: The Geography of Generosity Ranking	37](#appendix-d:-the-geography-of-generosity-ranking)

[Appendix E: Exploratory & Diagnostic Figures	38](#appendix-e:-exploratory-&-diagnostic-figures)

[Appendix F: Personal Note	42](#heading=h.oiaqq5hjb128)

# 

# Introduction {#introduction}

## Background {#background}

Tipping is one of the most pervasive yet poorly understood economic behaviors in the United States. Unlike fixed pricing models where labor costs are embedded in the service fee, the taxi and transportation industry relies heavily on a system of voluntary subsidization. For the thousands of taxi drivers operating in metropolitan areas like Chicago, tips are not merely a bonus for exceptional service; they constitute a critical, often volatile, component of their total livelihood.

In the modern "gig economy," uncertainty is the norm. A driver’s income fluctuates based on traffic, weather, and competition from ride-sharing platforms. However, one variable remains particularly opaque: the generosity of the passenger. While social norms dictate a standard tipping range (typically 15–20%), individual adherence to this norm varies wildly. Is this variation purely random, driven by the mood of the passenger? Or are there deeper, structural predictors of generosity rooted in the socioeconomic fabric of the city itself? Understanding these patterns is not just an academic exercise; for a driver making strategic decisions about where to operate, it is a matter of economic efficiency.

## Problem Statement {#problem-statement}

While anecdotal evidence among drivers suggests that certain neighborhoods are "better" for tips than others, this wisdom is often clouded by confounding variables. A trip from a wealthy neighborhood might yield a higher absolute tip simply because the destination is further away (resulting in a higher fare), not because the passenger is inherently more generous.

This study seeks to disentangle these factors. By merging ten years of trip data from the City of Chicago’s Taxi Trips dataset with socioeconomic data from the American Community Survey (ACS), we aim to isolate the specific impact of neighborhood wealth on tipping behavior. The core problem this report addresses is whether a "geography of generosity" exists—a measurable, statistically significant pattern where the socioeconomic status of a pickup location predicts the percentage a passenger is willing to tip, independent of the trip’s cost, duration, or timing.

## Research Questions {#research-questions}

To investigate this phenomenon, this report addresses four specific research questions:

* **Q1:** Is there a statistically significant relationship between the estimated mean income of a Chicago community area and the tip percentages given on taxi trips originating from that area?  
* **Q2:** Does this relationship hold true even after controlling for confounding variables such as the trip fare amount, trip duration, time of day, and day of the week?  
* **Q3:** Can we quantify the "price of generosity"? Specifically, for every unit increase in a neighborhood's mean household income, what is the expected percentage increase in the tip?  
* **Q4:** Which specific Chicago neighborhoods exhibit the highest and lowest levels of "generosity" (tipping above or below the expected model prediction)?

## Central Hypothesis {#central-hypothesis}

Based on the economic theory that disposable income correlates with discretionary spending, we propose the following central hypothesis:

**Hypothesis (H1):** Taxi trips originating from community areas with higher socioeconomic status (measured by estimated mean household income) will exhibit a higher average tip percentage compared to trips from lower-income areas, even when controlling for trip length, fare, and temporal factors.

Conversely, the Null Hypothesis (H0) posits that once the mechanics of the trip (fare and duration) are accounted for, the socioeconomic status of the pickup location has no statistically significant effect on the tip percentage.

## Report Structure {#report-structure}

The remainder of this report is organized as follows:

* **Data & Methodology** details the acquisition, cleaning, and merging of the Chicago Taxi and ACS datasets, including the feature engineering required to calculate neighborhood income estimates.  
* **Exploratory Data Analysis** presents a visual investigation of the variables, identifying key trends and potential modeling pitfalls such as multicollinearity.  
* **Regression Modeling & Results** documents the step-by-step construction of the regression models, diagnostic testing, and validation procedures.  
* **Analysis & Interpretation** synthesizes the findings to answer the research questions and presents the final "Geography of Generosity" rankings.  
* **Conclusion** summarizes the study's implications and limitations.

# 

# Data & Methodology {#data-&-methodology}

To analyze the relationship between neighborhood socioeconomic status and tipping behavior, a robust data pipeline was constructed to integrate transportation records with census-level demographic data. This section details the data acquisition, cleaning, feature engineering, and transformation processes employed in the study.

## Data Sources {#data-sources}

This analysis relies on the synthesis of three distinct public datasets provided by the City of Chicago Data Portal. Table 1.1 below summarizes the sources utilized.

**Table 1.1: Dataset Descriptions**

| Dataset Name | Source Description | Key Variables Utilized |
| :---- | :---- | :---- |
| ***Chicago Taxi Trips*** | A comprehensive log of taxi trips reported to the City of Chicago from 2013 to 2023\. | Trip Start Timestamp, Trip Seconds, Trip Miles, Fare, Tips, Pickup Community Area |
| ***Census Data \- Selected Socioeconomic Indicators*** | American Community Survey (ACS) 5-Year Estimates for Chicago community areas. | Community Area Name, Household Income Bins (e.g., "Under $25k", "$25k–$50k") |
| ***Boundaries \- Community Areas*** | A GIS-based lookup table defining the names and numeric identifiers of Chicago’s 77 community areas. | AREA\_NUMBE (ID), COMMUNITY (Name) |

### 

## Data Acquisition and Integration {#data-acquisition-and-integration}

A primary challenge in merging these datasets was a schema mismatch between the transportation and census data. The Taxi Trips dataset identifies pickup locations using a numeric identifier (e.g., 8 for Near North Side), while the ACS census data utilizes string labels (e.g., "NEAR NORTH SIDE").

To resolve this, the *Boundaries* dataset served as a bridge table. A three-stage join process was executed:

1. **Standardization**  
   All community names in the lookup table and ACS data were converted to uppercase to ensure string matching consistency.  
2. **Intermediate Join**  
   The ACS socioeconomic data was joined with the Boundaries lookup table to append the correct numeric ID (*community\_num\_key*) to each neighborhood’s profile.  
3. **Final Merge**  
   The enhanced ACS data was left joined to the primary Taxi Trips dataset on the *Pickup Community Area* key, effectively stamping every taxi trip with the socioeconomic profile of its origin neighborhood.

## Data Cleaning and Preprocessing {#data-cleaning-and-preprocessing}

Raw data from the City of Chicago portal contains formatting inconsistencies and entry errors that required significant cleaning before analysis.

* **Sanitization of Currency**  
  Columns such as Fare and Tips were originally stored as character strings containing “$” symbols. These were stripped of non-numeric characters and converted to double precision floating point numbers.  
* **Filtering Invalid Records**  
  To ensure economic viability, the dataset was filtered to exclude impossible or non-commercial trips. Records were removed if:  
  * Fare \<= 0 (System errors or voided trips)  
  * Tips \< 0 (Chargebacks or errors)  
  * Trip Seconds \<= 0 (Instantaneous timestamps implying system errors)  
* **Missing Values**  
  Trips with missing *Pickup Community Area* data or those that could not be joined to a valid census tract were excluded, as they could not contribute to the geospatial analysis.

## Feature Engineering {#feature-engineering}

Feature engineering was critical to transforming raw administrative logs into meaningful predictors for regression modeling.

### The Target Variable: Tip Percentage {#the-target-variable:-tip-percentage}

The raw Tips column is an absolute value, which naturally scales with the fare. To measure generosity rather than cost, a new target variable was calculated:

Tip Percentage \= (Tips/Fare) \* 100

### The Socioeconomic Predictor: Estimated Mean Income {#the-socioeconomic-predictor:-estimated-mean-income}

The provided ACS dataset did not contain a pre-calculated *Mean Household Income* or *Median Household Income*. Instead, it provided binned frequency counts of households (e.g., number of families earning between $25,000 and $49,999).

To create a continuous quantitative predictor, a weighted arithmetic mean was engineered for each community area. We assigned a midpoint value to each income bin and calculated the *Estimated Mean Income* as follows:

Estimated Mean Income \= (Countbin \* Midpointbin)Total Households

The assumed midpoints were:

* *Under $25,000:* 		**$12,500**  
* *$25,000 to $49,999:* 		**$37,500**  
* *$50,000 to $74,999:* 		**$62,500**  
* *$75,000 to $125,000:* 		**$100,000**  
* *$125,000+:* 			**$150,000** (Conservative estimate for the open-ended upper bin)

### Time-Based Covariates {#time-based-covariates}

Tipping behavior is hypothesized to vary by time of day and day of the week. Using the *lubridate* package, the *Trip Start Timestamp* was parsed to extract:

* Trip\_Hour (0–23)  
* Trip\_Day\_Of\_Week (Mon–Sun)  
* Trip\_Month and Trip\_Year (to control for seasonality and inflation)

## Variable Transformation for Modeling {#variable-transformation-for-modeling}

Linear regression relies on assumptions of normality and homoscedasticity. Initial exploratory analysis revealed significant violations of these assumptions, necessitating transformation.

### Handling Outliers {#handling-outliers}

The *Tip\_Percentage* variable contained extreme outliers (e.g., 1000%+ tips likely due to data entry errors). To prevent these from skewing the model, the variable was capped at the 99th percentile.

### Log-Transformation of the Target {#log-transformation-of-the-target}

As shown in Figure 1.1, the distribution of tip percentages was highly right-skewed, with a massive concentration at 0% and a long tail. This violates the normality assumption of Ordinary Least Squares (OLS) regression.

**Figure 1.1: Histogram of Raw Tip Percentage (Skewed)**

![][image1]

To correct this, a log-transformation was applied:

Y \= ln(Tip Percentage Capped \+ 1\)

Note: A constant of 1 was added to handle cases where the tip was 0%, as ln(0) is undefined.

As illustrated in Figure 1.2, this transformation successfully normalized the distribution, producing a bell-shaped curve suitable for linear modeling.

**Figure 1.2: Histogram of Log-Transformed Tip Percentage (Normal)**

![][image2]

### Factorization {#factorization}

Qualitative variables such as *Trip\_Day\_Of\_Week* and *Trip\_Hour* were explicitly converted to unordered factors. This ensures the regression model treats them as distinct categories (creating dummy variables) rather than continuous numeric values (which would incorrectly imply that 11:00 PM is "greater than" 10:00 PM).

## Software and Performance Optimization {#software-and-performance-optimization}

The analysis was conducted using **R Studio**. Due to the magnitude of the dataset (millions of rows), the *data.table* package was utilized for high-performance memory management and aggregation during the modeling phase, while the *tidyverse* suite (*dplyr, ggplot2, readr*) was employed for initial data manipulation and visualization.

# 

# Exploratory Data Analysis {#exploratory-data-analysis}

Before constructing formal regression models, a comprehensive Exploratory Data Analysis (EDA) was conducted to visualize the underlying structure of the dataset, validate assumptions, and detect potential anomalies. This phase served two primary purposes: (1) to assess the visual validity of the central hypothesis linking neighborhood income to tipping behavior, and (2) to identify confounding variables and multicollinearity that could destabilize the final model.

## Univariate Analysis {#univariate-analysis}

The primary target variable, *Tip\_Percentage*, exhibited extreme right skewness. However, the distribution of the key predictor, *Estimated\_Mean\_Income*, also warranted examination to understand the economic diversity of the sample.

The dataset covers a wide socioeconomic spectrum, ranging from community areas with estimated mean household incomes near $20,000 to those exceeding $100,000. This variance is essential; without sufficient spread in the predictor variable, regression analysis would lack the leverage required to detect a significant effect.

## Bivariate Analysis: Testing the Central Hypothesis {#bivariate-analysis:-testing-the-central-hypothesis}

Whether wealthier neighborhoods tip more is difficult to visualize using raw data due to the sheer volume of trips (millions of points create "overplotting"). To reveal the underlying signal, the data was aggregated by *Pickup Community Area*. For each of the 77 community areas, we calculated the mean *log\_Tip\_Percentage* and plotted it against the *Estimated\_Mean\_Income*.

Figure 2.1 presents this aggregated relationship.

**Figure 2.1: Scatter Plot of Average Tip vs. Neighborhood Income**

![][image3]  
**Interpretation**:

The scatter plot reveals a clear, positive linear trend. As the estimated mean income of the pickup neighborhood increases (moving right on the x-axis), the average tip percentage also increases (moving up on the y-axis). The red regression line confirms this trajectory, providing strong initial visual evidence in support of Hypothesis H\_1. Notably, the size of the points (representing the number of trips) indicates that while high-volume areas like the Loop drive much of the data, the relationship appears consistent across both high-traffic and low-traffic neighborhoods.

## Investigating Confounding Variables {#investigating-confounding-variables}

To isolate the effect of income, we must first understand how other factors influence tipping. We examined temporal and monetary variables to justify their inclusion as controls in the final model.

### The "Weekend Effect" {#the-"weekend-effect"}

Tipping norms often vary by the context of the trip (e.g., business vs. leisure). Figure 3.1 displays the volume of trips by day, while Figure 3.2 examines the distribution of tip percentages across the week.

**Figure 3.1: Bar Chart of Total Trips by Day of Week**

![][image4]  
**Figure 3.2: Boxplot of Tip Percentage by Day of Week**

![][image5]  
**Interpretation**:

While trip volume (Figure 3.1) remains relatively stable, the boxplot (Figure 3.2) suggests subtle variations in the median tip percentage on Fridays and Saturdays compared to weekdays. This confirms that *Trip\_Day\_Of\_Week* is a necessary control variable to account for the "leisure" or "nightlife" premium often associated with weekend travel.

### The Fare-Tip Relationship {#the-fare-tip-relationship}

A common assumption is that the tip percentage decreases as the fare becomes very large (a "diminishing returns" effect). Figure 3.3 utilizes a 2D density heatmap to visualize the relationship between *Fare* and *Tip\_Percentage*.

**Figure 3.3: Heatmap of Tip Percentage vs. Fare**

![][image6]  
**Interpretation**:

The heatmap shows a dense concentration (yellow/green) around 15% tipping range for fares under $40. However, as fares increase, the variance tightens, and the distribution shifts. This non-uniform behavior confirms that Fare is not just a denominator in the calculation but an independent predictor of the rate at which passengers tip, necessitating its inclusion in the model.

## Diagnosing Modeling Pitfalls: Multicollinearity {#diagnosing-modeling-pitfalls:-multicollinearity}

A critical step in regression analysis is checking for multicollinearity; When two predictor variables are so highly correlated that the model cannot distinguish their individual effects.

We hypothesized that *Trip Seconds* (duration) and *Fare* (cost) would be strongly correlated, as taxi meters are time-and-distance based. Figure 3.4 tests this relationship.

**Figure 3.4: Scatter Plot of Fare vs. Trip Duration**

![][image7]

**Interpretation**:

The plot reveals a near-perfect linear relationship between trip duration and fare, which is mechanically expected in the taxi industry. In many modeling contexts, this would be a "red flag" for multicollinearity.

**Implication for Modeling:**

This strong correlation suggests that including both Fare and Trip Seconds in the same model could artificially inflate the standard errors of the coefficients (Variance Inflation). Consequently, a formal Variance Inflation Factor (VIF) test must be conducted to determine if both variables can be safely retained or if one must be dropped to preserve model stability.

## Regression Modeling & Results {#regression-modeling-&-results}

To empirically test the relationship between neighborhood socioeconomic status and tipping behavior, a hierarchical regression approach was employed. We began with a Simple Linear Regression (SLR) to establish a baseline relationship, followed by a Multiple Linear Regression (MLR) to control for confounding variables. Finally, the model was subjected to rigorous diagnostic testing for multicollinearity and validated using a split-sample approach.

### Model 1: Simple Linear Regression (SLR) {#model-1:-simple-linear-regression-(slr)}

The first stage of analysis involved a Simple Linear Regression model to test the unadjusted relationship between the predictor (*Estimated\_Mean\_Income*) and the response (*log\_Tip\_Percentage*).

**Model Specification:**

ln(Tip Percentage) \= 0 \+ 1(Estimated Mean Income) \+ 

**Results**:

The model summary (see Appendix C.1) revealed a statistically significant positive relationship. The coefficient for *Estimated\_Mean\_Income* was positive, and the p-value was effectively zero (p \< 2.2e-16). This provides initial support for Hypothesis H1, confirming that without controlling for any other factors, wealth is a predictor of tipping rates.

However, the Adjusted R² value was low (approximately 0.02), indicating that while income is a *significant* predictor, it explains only a small fraction of the total variance in tipping behavior. This confirms that tipping is a complex phenomenon influenced by other factors, necessitating a more robust model.

### Model 2: Multiple Linear Regression (MLR) {#model-2:-multiple-linear-regression-(mlr)}

To isolate the specific effect of neighborhood income, we constructed a Multiple Linear Regression model incorporating the control variables identified in the EDA: *Fare*, *Trip Seconds*, *Trip\_Day\_Of\_Week*, and *Trip\_Hour*.

**Model Specification:**

ln(Tip Percentage) \= 0 \+ 1(Income) \+ 2(Fare) \+ 3(Seconds) \+

4(Day) \+5(Hour) \+ 

**Results**:

The inclusion of these covariates substantially improved the model's explanatory power.

* **Significance of Key Predictor:** Crucially, the coefficient for *Estimated\_Mean\_Income* remained positive and highly significant (p \< 2.2e-16) even after controlling for trip cost and duration. This suggests that the "wealth effect" observed in Model 1 was not merely a proxy for expensive trips but is an independent driver of generosity.  
* **Control Variables:** As expected, *Fare* and *Trip\_Day\_Of\_Week* were also significant predictors, confirming the patterns observed in the EDA.

## Model Diagnostics: Multicollinearity (VIF Test) {#model-diagnostics:-multicollinearity-(vif-test)}

A critical concern identified during the EDA (Section 3.4) was the strong correlation between *Fare* and *Trip Seconds*. In standard regression modeling, high correlation between predictors can lead to Multicollinearity, causing unstable coefficients and inflated standard errors.

To determine if this correlation compromised Model 2, a Variance Inflation Factor (VIF) test was conducted. A VIF score measures how much the variance of a regression coefficient is inflated due to collinearity.

* **Threshold:** Generally, a VIF \> 5 or 10 indicates a problematic level of multicollinearity.  
* **Results:** Table 4.1 presents the VIF scores for the predictors in Model 2\.

**Table 2.1: Variance Inflation Factor (VIF) Results**

| Variable | GVIF | Interpretation |
| :---- | :---- | :---- |
| **Estimated\_Mean\_Income** | **1.06** | Negligible Multicollinearity |
| **Fare** | **1.03** | Negligible Multicollinearity |
| **Trip Seconds** | **1.06** | Negligible Multicollinearity |
| **Trip\_Day\_Of\_Week** | **1.04** | Negligible Multicollinearity |
| **Trip\_Hour** | **1.05** | Negligible Multicollinearity |

**Interpretation**:

Despite the visual correlation observed in the scatter plots, the VIF test definitively proves that multicollinearity is not a statistical issue in this multivariate context. All scores are near 1.0, indicating that the variables provide independent information to the model. Consequently, both *Fare* and *Trip Seconds* were retained in the final model.

## Model Validation (Train/Test Split) {#model-validation-(train/test-split)}

To assess the model's predictive accuracy and ensure it was not "overfitting" the data (capturing noise rather than signal), a validation procedure was executed.

**Methodology**:

The dataset was randomly split into two subsets using the *caTools* library:

* **Training Set (80%):** Used to train the algorithm.  
* **Testing Set (20%):** Used to evaluate performance on unseen data.

Due to the dataset's size, the *data.table* package was utilized to optimize the memory-intensive prediction process.

**Results**:

The model was trained on the 80% partition and then used to predict the log tip percentages for the held out 20%. The performance was evaluated using the Root Mean Squared Error (RMSE), resulting in an RMSE of 1.613.

**Interpretation**:

The RMSE represents the standard deviation of the prediction errors (residuals). An RMSE of 1.613 (on the log scale) indicates a stable predictive baseline. Most importantly, the coefficients in the training model (*model\_final\_train*) remained consistent with the full model, confirming that the relationship between neighborhood income and tipping is robust and reproducible across different samples of the population.

# 

# Analysis & Interpretation of Findings {#analysis-&-interpretation-of-findings}

Having established a statistically robust multiple linear regression model (Model 2), we now turn to the interpretation of these results. This section assesses the validity of the model through residual diagnostics and synthesizes the findings to definitively answer the four research questions proposed at the outset of this study.

## Final Model Diagnostic Checks {#final-model-diagnostic-checks}

Before interpreting specific coefficients, we must verify that the final model satisfies the underlying assumptions of Ordinary Least Squares (OLS) regression, as violations could render our conclusions invalid.

### Residual Analysis {#residual-analysis}

Because the dataset contains millions of records, standard diagnostic plotting is computationally prohibitive. Instead, we examined a random sample of 10,000 residuals from the training set.

* **Homoscedasticity:** The *Residuals vs. Fitted Values* plot (Figure 4.1) displays a generally random "cloud" of points centered around zero. While there is some clustering due to the discrete nature of fare increments, there is no distinct "funnel shape" that would indicate heteroscedasticity. This suggests the variance of the error term is consistent across different predicted tip values.  
* **Normality of Errors:** The *Normal Q-Q Plot* (Figure 4.2) shows that the standardized residuals largely adhere to the 45-degree reference line. This confirms that the log-transformation of the target variable successfully normalized the error distribution, justifying the use of linear regression and t-tests for significance.

**Figure 4.1: Residuals vs. Fitted Values Plot**

![][image8]

**Figure 4.2: Normal Q-Q Plot of Residuals**

![][image9]

## Answering the Research Questions {#answering-the-research-questions}

### The Significance of Socioeconomic Status {#the-significance-of-socioeconomic-status}

* **Q1**: Is there a statistically significant relationship between neighborhood income and tipping?  
* **Q2**: Does this relationship hold after controlling for trip characteristics?

The analysis provides a definitive **YES** to both questions.

In the final multivariable model, the coefficient for *Estimated\_Mean\_Income* is statistically significant with a p-value of \< 2.2e-16. This significance level is orders of magnitude below the standard ⍺ \= 0.05 threshold. Crucially, this relationship remains robust even when *Fare, Trip Seconds, Trip\_Day\_Of\_Week*, and *Trip\_Hour* are held constant.

This result leads us to reject the Null Hypothesis (H0). We conclude that the socioeconomic status of a pickup location is not merely a proxy for the type of trip being taken (e.g., longer trips from suburbs); rather, it is an independent, intrinsic predictor of the tipping behavior associated with that geography.

### Quantifying the "Price of Generosity" {#quantifying-the-"price-of-generosity"}

* **Q3:** *What is the expected increase in tip percentage for a given increase in neighborhood income?*

The model relies on a log-linear specification (ln(Y) \= X).  Therefore, the coefficient for *Estimated\_Mean\_Income* represents the percentage change in the tip for a unit increase in income.

Based on the model output, we observe a positive coefficient. Interpreting this in practical terms:

***Holding all other factors constant (fare, duration, time of day), a $10,000 increase in the estimated mean household income of a community area is associated with a statistically significant increase in the expected tip percentage.***

Note: While the raw percentage increase may appear small per ride, aggregated over millions of trips, this represents a massive transfer of wealth from wealthier neighborhoods to the driver workforce.

### The Geography of Generosity {#the-geography-of-generosity}

* **Q4:** *Which specific neighborhoods exhibit the highest and lowest levels of generosity?*

To answer this, we calculated a *Generosity Score* (Mean Residual) for each of Chicago’s 77 Community Areas.

* A positive score indicates the neighborhood tips more than the model predicts (taking into account their income and trip details).  
* A negative score indicates the neighborhood tips less than the model predicts.

Figure 4.1 visualizes the divergence between the most and least generous areas.

**Figure 4.1: The Geography of Generosity Bar Chart**

![][image10]

### The "Least Generous" Anomalies {#the-"least-generous"-anomalies}

The bottom five neighborhoods (lowest residuals) presented a surprising finding. As shown in Table 3.1, areas such as *Beverly, Mount Greenwood,* and *Forest Glen* ranked lowest in generosity relative to expectation.

**Table 3.1: Bottom 5 Neighborhoods by Generosity Score (Residuals)**

| Rank | Community Area | Generosity Score  (Mean Residual) | Interpretation |
| :---- | :---- | :---- | :---- |
| 72 | **Morgan Park** | \-1.19 | Tips \~1.2% less than predicted |
| 73 | **Edison Park** | \-1.29 | Tips \~1.3% less than predicted |
| 74 | **Forest Glen** | \-1.31 | Tips \~1.3% less than predicted |
| 76 | **Mount Greenwood** | \-1.35 | Tips \~1.35% less than predicted |
| 77 | **Beverly** | \-1.46 | Tips \~1.46% less than predicted |

**Interpretation**:

This is a counter-intuitive discovery. Beverly and Forest Glen are historically affluent, high-income neighborhoods. Our model predicts they should tip highly. The fact that they have large negative residuals suggests that high income does not perfectly guarantee high tipping.

These areas are located on the far outskirts of the city, bordering the suburbs. The lower-than-expected tipping might be cultural, or it might be related to the nature of taxi usage in these areas (e.g., strictly utilitarian trips to the airport vs. leisure trips). This finding highlights the value of residual analysis: it uncovers the human behavioral quirks that raw income data cannot explain.

### The "Most Generous" Neighborhoods {#the-"most-generous"-neighborhoods}

Conversely, the neighborhoods with the highest positive residuals represent areas where passengers consistently "over-tip" relative to the model's expectation. These areas often include vibrant nightlife districts or tourist hubs, where the social pressure to tip may override standard economic calculus.

| Rank | Community Area | Generosity Score  (Mean Residual) | Interpretation |
| :---- | :---- | :---- | :---- |
| 1 | **O’Hare** | 0.856 | Tips \~0.86% more than predicted |
| 2 | **Garfield Ridge** | 0.570 | Tips \~0.57% more than predicted |
| 3 | **Loop** | 0.088 | Tips \~0.09% more than predicted |
| 4 | **Near West Side** | 0.03 | Tips \~0.03% more than predicted |
| 5 | **Near South Side** | \-0.012 | Tips \~0.01% less than predicted |

# 

# Conclusion {#conclusion}

## Summary of Findings {#summary-of-findings}

This study set out to investigate the "geography of generosity" in Chicago, specifically analyzing whether the socioeconomic status of a pickup neighborhood serves as a reliable predictor of taxi tipping behavior. Through the analysis of ten years of taxi trip records and the construction of a robust multiple linear regression model, we have found empirical evidence to support our central hypothesis (H1).

The findings can be summarized as follows:

1. **Income is a Significant Predictor**  
   The overall global trend indicates a statistically significant, positive relationship between the estimated mean household income of a community area and the tip percentage provided by passengers originating from that area (p \< 2.2e-16).  
2. **The Effect is Independent**   
   This relationship holds true even after controlling for the cost of the trip (*Fare*), the duration (*Trip Seconds*), and temporal factors (*Day* and *Hour*). This confirms that the correlation is not merely a byproduct of wealthier passengers taking longer or more expensive trips.  
3. **The "Wealth Paradox"**   
   The residual analysis (*The Generosity Score*) revealed a nuanced reality. While the general trend is positive, specific high-income neighborhoods on the city's periphery (such as *Beverly, Mount Greenwood*, and *Forest Glen*) exhibited the largest negative residuals. This indicates that in these specific locales, passengers consistently tip less than the model predicts given their economic status.

## Limitations of the Research {#limitations-of-the-research}

While the findings are statistically robust, several limitations inherent to the dataset and methodology must be acknowledged:

1. **Cash Tips Bias**  
   The dataset relies primarily on electronic payment records. Cash tips are frequently unrecorded or under-reported. If lower-income passengers are more likely to pay in cash, or if cash tippers tend to round up more generously, the model may suffer from systematic bias.  
2. **Ecological Fallacy**  
   The socioeconomic data is aggregated at the "Community Area" level. Chicago’s community areas are large and economically diverse; assigning a single "Estimated Mean Income" to every passenger in a wide geographic area smoothes over block-by-block inequality, potentially dampening the signal.  
3. **The "Dropoff" Blind Spot**  
   This study focused exclusively on the pickup location. However, the destination may be equally influential. A passenger heading to O'Hare Airport or a luxury hotel might tip differently than one heading to a workplace, regardless of where the trip started.  
4. **Income Estimation**  
   The *Estimated\_Mean\_Income* variable was derived from binned frequency data rather than raw census values. While the weighted mean approach is a standard statistical technique, it remains an approximation.

## Future Work {#future-work}

Future research into the economics of transportation tipping could expand on this foundation in three key ways:

1. **Destination Analysis**  
   Incorporating the *Dropoff Community Area* into the regression model would allow for a "Route Analysis." Do trips between two wealthy neighborhoods yield the highest tips, or does the destination matter more than the origin?  
2. **Two-Part Modeling**  
   A large number of trips result in a 0% tip. Future studies could employ a Hurdle Model or Logistic Regression to first predict the probability of a tip occurring, and then use a Linear Regression to predict the magnitude of that tip.  
3. **Weather and Events**  
   Integrating external datasets regarding precipitation, temperature, and major city events (e.g., Lollapalooza, sports games) could isolate the "scarcity premium", e.g. Do passengers tip more when conditions are difficult?

## Concluding Remarks {#concluding-remarks}

In the gig economy, knowledge is income. For a Chicago taxi driver, the decision of where to position their vehicle is a complex calculation of probability and risk. This report demonstrates that while the meter determines the fare, the map determines the tip. By identifying the "Geography of Generosity," we provide a data-driven framework for understanding the hidden economic social contract that plays out in the backseat of every cab in the city.

# 

# Appendices {#appendices}

## Appendix A: Complete R Script {#appendix-a:-complete-r-script}

*The following script details the end-to-end data processing, feature engineering, and modeling pipeline used in this analysis.*

\# 1\. Setup and Library Loading

library(tidyverse)

library(lubridate)

library(data.table)

library(caTools)

library(car)

\# 2\. Data Loading (Using files in a working directory)

taxi\_trips \<- fread("Chicago\_Taxi\_Trips\_2013\_2023.csv")

acs\_data \<- read\_csv("Chicago\_Socioeconomic\_data.csv")

community\_lookup \<- read\_csv("Boundaries\_Community\_Areas.csv")

\# 3\. Data Cleaning & Merging

\# 3.1 Standardize names for joining

community\_lookup \<- community\_lookup %\>% 

  mutate(community\_name\_key \= toupper(COMMUNITY),

         community\_num\_key \= as.integer(AREA\_NUMBE))

acs\_data \<- acs\_data %\>% 

  mutate(community\_name\_key \= toupper(\`Community Area Name\`))

\# 3.2 Join 1: Add Numeric IDs to ACS Data

acs\_with\_id \<- left\_join(acs\_data, community\_lookup, by \= "community\_name\_key")

\# 3.3 Feature Engineering: Estimate Mean Income from Bins

acs\_with\_id \<- acs\_with\_id %\>%

  mutate(

    bin1 \= \`Under $25,000\`,

    bin2 \= \`$25,000 to $49,999\`,

    bin3 \= \`$50,000 to $74,999\`,

    bin4 \= \`$75,000 to $125,000\`,

    bin5 \= \`$125,000 \+\`,

    Total\_Households \= bin1 \+ bin2 \+ bin3 \+ bin4 \+ bin5,

    Estimated\_Total\_Income \= (bin1 \* 12500\) \+ (bin2 \* 37500\) \+ (bin3 \* 62500\) \+ 

                             (bin4 \* 100000\) \+ (bin5 \* 150000),

    Estimated\_Mean\_Income \= Estimated\_Total\_Income / Total\_Households

  )

\# 3.4 Join 2: Merge ACS Data into Taxi Data (Using data.table for speed on the main join)

setDT(taxi\_trips)

setDT(acs\_with\_id)

analysis\_data \<- merge(taxi\_trips, acs\_with\_id, 

                       by.x \= "Pickup Community Area", 

                       by.y \= "community\_num\_key", 

                       all.x \= FALSE) \# Inner join to keep only matched areas

\# 4\. Preprocessing & Transformation

\# 4.1 Clean Numeric Columns (Strip '$' if necessary and convert)

analysis\_data\[, Fare := as.numeric(gsub("\[\\\\$,\]", "", Fare))\]

analysis\_data\[, Tips := as.numeric(gsub("\[\\\\$,\]", "", Tips))\]

\# 4.2 Filter Invalid Rows

analysis\_data \<- analysis\_data\[Fare \> 0 & Tips \>= 0 & \`Trip Seconds\` \> 0\]

analysis\_data \<- analysis\_data\[\!is.na(Estimated\_Mean\_Income)\]

\# 4.3 Feature Engineering: Target Variable & Time Factors

analysis\_data\[, Tip\_Percentage := (Tips / Fare) \* 100\]

analysis\_data\[, Timestamp := ymd\_hms(\`Trip Start Timestamp\`)\]

analysis\_data\[, \`:=\`(

  Trip\_Year \= year(Timestamp),

  Trip\_Month \= month(Timestamp),

  Trip\_Day\_Of\_Week \= wday(Timestamp, label \= TRUE),

  Trip\_Hour \= hour(Timestamp)

)\]

\# 4.4 Handling Outliers (Capping at 99th Percentile)

cap\_val \<- quantile(analysis\_data$Tip\_Percentage, 0.99, na.rm=TRUE)

analysis\_data\[, Tip\_Percentage\_Capped := pmin(Tip\_Percentage, cap\_val)\]

\# 4.5 Log Transformation

analysis\_data\[, log\_Tip\_Percentage := log(Tip\_Percentage\_Capped \+ 1)\]

\# 4.6 Convert to Factors

cols\_to\_factor \<- c("Trip\_Day\_Of\_Week", "Trip\_Hour", "Pickup Community Area")

analysis\_data\[, (cols\_to\_factor) := lapply(.SD, as.factor), .SDcols \= cols\_to\_factor\]

\# 5\. Regression Modeling

\# 5.1 Train/Test Split (80/20)

set.seed(123)

split \<- sample.split(analysis\_data$log\_Tip\_Percentage, SplitRatio \= 0.8)

train\_data \<- analysis\_data\[split \== TRUE\]

test\_data \<- analysis\_data\[split \== FALSE\]

\# 5.2 Model 1: Simple Linear Regression

model1 \<- lm(log\_Tip\_Percentage \~ Estimated\_Mean\_Income, data \= train\_data)

\# 5.3 Model 2: Multiple Linear Regression (Final Model)

model\_final\_train \<- lm(log\_Tip\_Percentage \~ Estimated\_Mean\_Income \+ Fare \+ 

                        \`Trip Seconds\` \+ Trip\_Day\_Of\_Week \+ Trip\_Hour, 

                        data \= train\_data)

\# 5.4 Diagnostics: VIF

vif(model\_final\_train)

\# 5.5 Validation: RMSE on Test Data

test\_data\[, predictions := predict(model\_final\_train, newdata \= test\_data)\]

RMSE \<- test\_data\[, sqrt(mean((log\_Tip\_Percentage \- predictions)^2))\]

print(paste("RMSE:", RMSE))

\# 6\. Geography of Generosity (Residual Analysis)

\# 6.1 Calculate Residuals on Full Dataset

analysis\_data\[, prediction\_full := predict(model\_final\_train, newdata \= analysis\_data)\]

analysis\_data\[, generosity\_score := log\_Tip\_Percentage \- prediction\_full\]

\# 6.2 Aggregate by Community Area

geo\_generosity \<- analysis\_data\[, .(

  Mean\_Generosity \= mean(generosity\_score, na.rm \= TRUE),

  Total\_Trips \= .N

), by \= .(\`Community Area\`)\]

\# 6.3 Sort and View

setorder(geo\_generosity, \-Mean\_Generosity)

print(head(geo\_generosity, 5))

print(tail(geo\_generosity, 5))

## Appendix B: Data Dictionary {#appendix-b:-data-dictionary}

*Descriptions of the key variables retained in the final analytical dataset.*

**Table B.1: Datasets and Original Sources with URLs**

| Dataset Name | Source Description | URL |
| :---- | :---- | :---- |
| ***Chicago Taxi Trips*** | A comprehensive log of taxi trips reported to the City of Chicago from 2013 to 2023\. | https://data.cityofchicago.org/Transportation/Taxi-Trips-2013-2023-/wrvz-psew/about\_data |
| ***Census Data \- Selected Socioeconomic Indicators*** | American Community Survey (ACS) 5-Year Estimates (Updated February 6, 2025\) for Chicago community areas. | https://data.cityofchicago.org/Community-Economic-Development/ACS-5-Year-Data-by-Community-Area-Most-Recent-Year/7umk-8dtw/about\_data |
| ***Boundaries \- Community Areas*** | A GIS-based lookup table defining the names and numeric identifiers of Chicago’s 77 community areas. | https://data.cityofchicago.org/Facilities-Geographic-Boundaries/Boundaries-Community-Areas/igwz-8jzy/about\_data |

### 

**Table B.2: Taxi Trip Variables**

| Variable Name | Data Type | Description |
| :---- | :---- | :---- |
| **Trip Start Timestamp** | DateTime | The date and time the meter was engaged. |
| **Trip Seconds** | Numeric | The duration of the trip in seconds. |
| **Fare** | Numeric | The transportation cost of the trip. |
| **Tips** | Numeric | The tip amount recorded (credit card/cash). |
| **Pickup Community Area** | Factor | The numeric ID of the neighborhood where the trip began. |
| **Tip\_Percentage** | Numeric | Calculated field: (Tips / Fare) \* 100\. |
| **log\_Tip\_Percentage** | Numeric | Transformed Target: ln(Tip\_Percentage \+ 1). |

**Table B.3: Socioeconomic Variables (Engineered)**

| Variable Name | Data Type | Description |
| :---- | :---- | :---- |
| **Community Area** | String | The official name of the Chicago neighborhood. |
| **Estimated\_Mean\_Income** | Numeric | The weighted average household income calculated from ACS census bins. |

**Figure B.4: All data sets, frames, tables, values, and objects used in the analysis**

![][image11]

## Appendix C: Model Summaries {#appendix-c:-model-summaries}

### C.1	 Model 1: Simple Linear Regression Results {#c.1-model-1:-simple-linear-regression-results}

Call:  
lm(formula \= log\_Tip\_Percentage \~ Estimated\_Mean\_Income, data \= analysis\_data)

Residuals:  
   Min     1Q Median     3Q    Max   
\-1.738 \-1.661 \-1.081  1.651  3.339 

Coefficients:  
                       Estimate Std. Error t value Pr(\>|t|)      
(Intercept)           4.179e-01  2.052e-03   203.6   \<2e-16 \*\*\*  
Estimated\_Mean\_Income 9.836e-06  1.814e-08   542.3   \<2e-16 \*\*\*  
\---  
Signif. codes:  0 ‘\*\*\*’ 0.001 ‘\*\*’ 0.01 ‘\*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 1.622 on 19718413 degrees of freedom  
Multiple R-squared:  0.0147,	Adjusted R-squared:  0.0147   
F-statistic: 2.941e+05 on 1 and 19718413 DF,  p-value: \< 2.2e-16

### C.2	 Model 2: Multiple Linear Regression Results {#c.2-model-2:-multiple-linear-regression-results}

Call:  
lm(formula \= log\_Tip\_Percentage \~ Estimated\_Mean\_Income \+ Fare \+   
    \`Trip Seconds\` \+ Trip\_Day\_Of\_Week \+ Trip\_Hour, data \= analysis\_data)

Residuals:  
    Min      1Q  Median      3Q     Max   
\-8.5721 \-1.5209 \-0.9757  1.6310  3.6351 

Coefficients:  
                        Estimate Std. Error  t value Pr(\>|t|)      
(Intercept)            5.102e-01  3.369e-03  151.446  \< 2e-16 \*\*\*  
Estimated\_Mean\_Income  1.038e-05  1.861e-08  557.480  \< 2e-16 \*\*\*  
Fare                   6.477e-04  6.389e-06  101.384  \< 2e-16 \*\*\*  
\`Trip Seconds\`         1.831e-05  2.167e-07   84.468  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week.L    \-8.915e-02  1.032e-03  \-86.410  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week.Q    \-4.183e-02  1.032e-03  \-40.532  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week.C    \-7.022e-02  9.806e-04  \-71.612  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week^4     2.976e-02  9.520e-04   31.264  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week^5     9.812e-03  9.290e-04   10.562  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week^6     9.150e-03  9.211e-04    9.934  \< 2e-16 \*\*\*  
Trip\_Hour1            \-3.702e-02  4.097e-03   \-9.036  \< 2e-16 \*\*\*  
Trip\_Hour2            \-1.752e-01  4.698e-03  \-37.298  \< 2e-16 \*\*\*  
Trip\_Hour3            \-3.503e-01  5.257e-03  \-66.627  \< 2e-16 \*\*\*  
Trip\_Hour4            \-4.427e-01  5.341e-03  \-82.889  \< 2e-16 \*\*\*  
Trip\_Hour5            \-3.691e-01  4.676e-03  \-78.943  \< 2e-16 \*\*\*  
Trip\_Hour6            \-3.076e-01  3.893e-03  \-78.999  \< 2e-16 \*\*\*  
Trip\_Hour7            \-2.191e-01  3.373e-03  \-64.972  \< 2e-16 \*\*\*  
Trip\_Hour8            \-1.392e-01  3.141e-03  \-44.306  \< 2e-16 \*\*\*  
Trip\_Hour9            \-2.303e-01  3.079e-03  \-74.786  \< 2e-16 \*\*\*  
Trip\_Hour10           \-3.681e-01  3.059e-03 \-120.334  \< 2e-16 \*\*\*  
Trip\_Hour11           \-4.005e-01  3.030e-03 \-132.154  \< 2e-16 \*\*\*  
Trip\_Hour12           \-3.461e-01  3.004e-03 \-115.225  \< 2e-16 \*\*\*  
Trip\_Hour13           \-3.264e-01  2.993e-03 \-109.039  \< 2e-16 \*\*\*  
Trip\_Hour14           \-3.316e-01  2.989e-03 \-110.943  \< 2e-16 \*\*\*  
Trip\_Hour15           \-2.989e-01  2.982e-03 \-100.236  \< 2e-16 \*\*\*  
Trip\_Hour16           \-2.242e-01  2.971e-03  \-75.451  \< 2e-16 \*\*\*  
Trip\_Hour17           \-9.346e-02  2.958e-03  \-31.595  \< 2e-16 \*\*\*  
Trip\_Hour18           \-1.681e-02  2.972e-03   \-5.655 1.56e-08 \*\*\*  
Trip\_Hour19            2.978e-02  3.016e-03    9.876  \< 2e-16 \*\*\*  
Trip\_Hour20            4.710e-02  3.102e-03   15.187  \< 2e-16 \*\*\*  
Trip\_Hour21            3.859e-02  3.206e-03   12.040  \< 2e-16 \*\*\*  
Trip\_Hour22            1.178e-02  3.317e-03    3.552 0.000383 \*\*\*  
Trip\_Hour23           \-1.066e-02  3.478e-03   \-3.067 0.002165 \*\*   
\---  
Signif. codes:  0 ‘\*\*\*’ 0.001 ‘\*\*’ 0.01 ‘\*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 1.613 on 19718382 degrees of freedom  
Multiple R-squared:  0.02537,	Adjusted R-squared:  0.02537   
F-statistic: 1.604e+04 on 32 and 19718382 DF,  p-value: \< 2.2e-16

### C.3 	Model 3: Multiple Linear Regression Results (Interaction Model) {#c.3-model-3:-multiple-linear-regression-results-(interaction-model)}

Call:  
lm(formula \= log\_Tip\_Percentage \~ Estimated\_Mean\_Income \* Trip\_Day\_Of\_Week \+   
    Fare \+ \`Trip Seconds\` \+ Trip\_Hour, data \= analysis\_data)

Residuals:  
    Min      1Q  Median      3Q     Max   
\-8.5569 \-1.5197 \-0.9718  1.6300  3.8286 

Coefficients:  
                                           Estimate Std. Error  t value Pr(\>|t|)      
(Intercept)                               5.205e-01  3.384e-03  153.830  \< 2e-16 \*\*\*  
Estimated\_Mean\_Income                     1.029e-05  1.873e-08  549.477  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week.L                       \-6.683e-01  5.696e-03 \-117.325  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week.Q                        9.417e-02  5.660e-03   16.638  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week.C                       \-1.481e-01  5.477e-03  \-27.041  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week^4                       \-2.117e-01  5.332e-03  \-39.711  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week^5                        9.568e-02  5.250e-03   18.226  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week^6                       \-6.206e-02  5.227e-03  \-11.873  \< 2e-16 \*\*\*  
Fare                                      6.444e-04  6.386e-06  100.896  \< 2e-16 \*\*\*  
\`Trip Seconds\`                            1.842e-05  2.167e-07   85.005  \< 2e-16 \*\*\*  
Trip\_Hour1                               \-3.621e-02  4.096e-03   \-8.841  \< 2e-16 \*\*\*  
Trip\_Hour2                               \-1.724e-01  4.697e-03  \-36.703  \< 2e-16 \*\*\*  
Trip\_Hour3                               \-3.459e-01  5.256e-03  \-65.814  \< 2e-16 \*\*\*  
Trip\_Hour4                               \-4.380e-01  5.339e-03  \-82.044  \< 2e-16 \*\*\*  
Trip\_Hour5                               \-3.672e-01  4.674e-03  \-78.547  \< 2e-16 \*\*\*  
Trip\_Hour6                               \-3.080e-01  3.893e-03  \-79.121  \< 2e-16 \*\*\*  
Trip\_Hour7                               \-2.210e-01  3.374e-03  \-65.509  \< 2e-16 \*\*\*  
Trip\_Hour8                               \-1.419e-01  3.143e-03  \-45.161  \< 2e-16 \*\*\*  
Trip\_Hour9                               \-2.329e-01  3.080e-03  \-75.614  \< 2e-16 \*\*\*  
Trip\_Hour10                              \-3.703e-01  3.060e-03 \-121.028  \< 2e-16 \*\*\*  
Trip\_Hour11                              \-4.027e-01  3.031e-03 \-132.845  \< 2e-16 \*\*\*  
Trip\_Hour12                              \-3.489e-01  3.005e-03 \-116.095  \< 2e-16 \*\*\*  
Trip\_Hour13                              \-3.295e-01  2.995e-03 \-110.015  \< 2e-16 \*\*\*  
Trip\_Hour14                              \-3.350e-01  2.991e-03 \-112.018  \< 2e-16 \*\*\*  
Trip\_Hour15                              \-3.023e-01  2.984e-03 \-101.317  \< 2e-16 \*\*\*  
Trip\_Hour16                              \-2.277e-01  2.973e-03  \-76.593  \< 2e-16 \*\*\*  
Trip\_Hour17                              \-9.756e-02  2.960e-03  \-32.959  \< 2e-16 \*\*\*  
Trip\_Hour18                              \-2.179e-02  2.974e-03   \-7.327 2.35e-13 \*\*\*  
Trip\_Hour19                               2.358e-02  3.018e-03    7.815 5.50e-15 \*\*\*  
Trip\_Hour20                               4.049e-02  3.103e-03   13.047  \< 2e-16 \*\*\*  
Trip\_Hour21                               3.168e-02  3.207e-03    9.876  \< 2e-16 \*\*\*  
Trip\_Hour22                               4.102e-03  3.319e-03    1.236    0.216      
Trip\_Hour23                              \-1.939e-02  3.479e-03   \-5.573 2.51e-08 \*\*\*  
Estimated\_Mean\_Income:Trip\_Day\_Of\_Week.L  5.237e-06  5.052e-08  103.671  \< 2e-16 \*\*\*  
Estimated\_Mean\_Income:Trip\_Day\_Of\_Week.Q \-1.275e-06  5.019e-08  \-25.393  \< 2e-16 \*\*\*  
Estimated\_Mean\_Income:Trip\_Day\_Of\_Week.C  6.939e-07  4.850e-08   14.308  \< 2e-16 \*\*\*  
Estimated\_Mean\_Income:Trip\_Day\_Of\_Week^4  2.176e-06  4.725e-08   46.060  \< 2e-16 \*\*\*  
Estimated\_Mean\_Income:Trip\_Day\_Of\_Week^5 \-7.923e-07  4.641e-08  \-17.072  \< 2e-16 \*\*\*  
Estimated\_Mean\_Income:Trip\_Day\_Of\_Week^6  6.471e-07  4.612e-08   14.030  \< 2e-16 \*\*\*  
\---  
Signif. codes:  0 ‘\*\*\*’ 0.001 ‘\*\*’ 0.01 ‘\*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 1.613 on 19718376 degrees of freedom  
Multiple R-squared:  0.02606,	Adjusted R-squared:  0.02606   
F-statistic: 1.389e+04 on 38 and 19718376 DF,  p-value: \< 2.2e-16

### C.4 	Model 4: Multiple Linear Regression Results (Final Training Model) {#c.4-model-4:-multiple-linear-regression-results-(final-training-model)}

**Target:** log\_Tip\_Percentage

Call:  
lm(formula \= log\_Tip\_Percentage \~ Estimated\_Mean\_Income \+ Fare \+   
    Trip\_Day\_Of\_Week \+ Trip\_Hour, data \= train\_data)

Residuals:  
    Min      1Q  Median      3Q     Max   
\-8.6950 \-1.5219 \-0.9854  1.6336  3.5972 

Coefficients:  
                        Estimate Std. Error  t value Pr(\>|t|)      
(Intercept)            5.613e-01  3.706e-03  151.444  \< 2e-16 \*\*\*  
Estimated\_Mean\_Income  1.005e-05  2.042e-08  492.310  \< 2e-16 \*\*\*  
Fare                   6.935e-04  7.061e-06   98.219  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week.L    \-8.838e-02  1.154e-03  \-76.610  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week.Q    \-4.059e-02  1.154e-03  \-35.172  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week.C    \-7.145e-02  1.096e-03  \-65.161  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week^4     2.980e-02  1.065e-03   27.991  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week^5     8.642e-03  1.039e-03    8.318  \< 2e-16 \*\*\*  
Trip\_Day\_Of\_Week^6     9.190e-03  1.030e-03    8.921  \< 2e-16 \*\*\*  
Trip\_Hour1            \-3.401e-02  4.583e-03   \-7.421 1.16e-13 \*\*\*  
Trip\_Hour2            \-1.758e-01  5.256e-03  \-33.454  \< 2e-16 \*\*\*  
Trip\_Hour3            \-3.533e-01  5.879e-03  \-60.102  \< 2e-16 \*\*\*  
Trip\_Hour4            \-4.406e-01  5.971e-03  \-73.791  \< 2e-16 \*\*\*  
Trip\_Hour5            \-3.614e-01  5.232e-03  \-69.069  \< 2e-16 \*\*\*  
Trip\_Hour6            \-3.008e-01  4.354e-03  \-69.090  \< 2e-16 \*\*\*  
Trip\_Hour7            \-2.155e-01  3.772e-03  \-57.133  \< 2e-16 \*\*\*  
Trip\_Hour8            \-1.364e-01  3.513e-03  \-38.816  \< 2e-16 \*\*\*  
Trip\_Hour9            \-2.278e-01  3.444e-03  \-66.133  \< 2e-16 \*\*\*  
Trip\_Hour10           \-3.653e-01  3.421e-03 \-106.762  \< 2e-16 \*\*\*  
Trip\_Hour11           \-3.964e-01  3.390e-03 \-116.931  \< 2e-16 \*\*\*  
Trip\_Hour12           \-3.428e-01  3.360e-03 \-102.011  \< 2e-16 \*\*\*  
Trip\_Hour13           \-3.218e-01  3.348e-03  \-96.115  \< 2e-16 \*\*\*  
Trip\_Hour14           \-3.246e-01  3.343e-03  \-97.083  \< 2e-16 \*\*\*  
Trip\_Hour15           \-2.909e-01  3.335e-03  \-87.247  \< 2e-16 \*\*\*  
Trip\_Hour16           \-2.151e-01  3.322e-03  \-64.736  \< 2e-16 \*\*\*  
Trip\_Hour17           \-8.533e-02  3.308e-03  \-25.796  \< 2e-16 \*\*\*  
Trip\_Hour18           \-9.672e-03  3.324e-03   \-2.910 0.003617 \*\*   
Trip\_Hour19            3.413e-02  3.373e-03   10.118  \< 2e-16 \*\*\*  
Trip\_Hour20            5.299e-02  3.469e-03   15.274  \< 2e-16 \*\*\*  
Trip\_Hour21            4.277e-02  3.586e-03   11.927  \< 2e-16 \*\*\*  
Trip\_Hour22            1.318e-02  3.711e-03    3.552 0.000383 \*\*\*  
Trip\_Hour23           \-7.706e-03  3.889e-03   \-1.981 0.047557 \*    
\---  
Signif. codes:  0 ‘\*\*\*’ 0.001 ‘\*\*’ 0.01 ‘\*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 1.614 on 15774079 degrees of freedom  
Multiple R-squared:  0.02493,	Adjusted R-squared:  0.02492   
F-statistic: 1.301e+04 on 31 and 15774079 DF,  p-value: \< 2.2e-16

## Appendix D: The Geography of Generosity Ranking {#appendix-d:-the-geography-of-generosity-ranking}

*The top and bottom ranking neighborhoods based on the "Generosity Score" (Mean Residual). A positive score indicates the neighborhood tips higher than the model predicts; a negative score indicates they tip lower.*

**Table D.1: Top 5 Most Generous Neighborhoods (Relative to Expectation)**

| Rank | Community Area | Generosity Score  (Mean Residual) | Interpretation |
| :---- | :---- | :---- | :---- |
| 1 | **O’Hare** | 0.856 | Tips \~0.86% more than predicted |
| 2 | **Garfield Ridge** | 0.570 | Tips \~0.57% more than predicted |
| 3 | **Loop** | 0.088 | Tips \~0.09% more than predicted |
| 4 | **Near West Side** | 0.03 | Tips \~0.03% more than predicted |
| 5 | **Near South Side** | \-0.012 | Tips \~0.01% less than predicted |

**Table D.2: Bottom 5 Least Generous Neighborhoods (Relative to Expectation)**

| Rank | Community Area | Generosity Score  (Mean Residual) | Interpretation |
| :---- | :---- | :---- | :---- |
| 72 | **Morgan Park** | \-1.19 | Tips \~1.2% less than predicted |
| 73 | **Edison Park** | \-1.29 | Tips \~1.3% less than predicted |
| 74 | **Forest Glen** | \-1.31 | Tips \~1.3% less than predicted |
| 76 | **Mount Greenwood** | \-1.35 | Tips \~1.35% less than predicted |
| 77 | **Beverly** | \-1.46 | Tips \~1.46% less than predicted |

## Appendix E: Exploratory & Diagnostic Figures {#appendix-e:-exploratory-&-diagnostic-figures}

**Figure E.1:** Histogram of Raw Tip Percentage (Showing Skewness)

![][image1]

**Figure E.2:** Histogram of Log-Transformed Tip Percentage (Normalized)

![][image2]

**Figure E.3:** Scatter Plot: Average Tip Percentage vs. Estimated Neighborhood Income

![][image3]  
**Figure E.4:** Bar Chart: Total Trips by Day of the Week

![][image4]

**Figure E.5:** Boxplot: Tip Percentage by Day of the Week

![][image5]

**Figure E.6:** Heatmap: Tip Percentage vs. Fare Amount

![][image6]

**Figure E.7:** Scatter Plot: Fare vs. Trip Duration (Multicollinearity Check)

![][image7]

**Figure E.8:** Bar Chart: The Geography of Generosity (Residuals)

![][image10]

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnAAAAERCAIAAAB0MQ2WAAAY80lEQVR4Xu3dbZaqvBKGYcflgByPo3Ei+6eD6S35IikCGqtIQ/q+1jrv6YYARcA8DSr78gMAANQucgIAAGhHoAIAYIBABQDAAIEKAIABAhUAAAMEKgAABghUAAAMEKgAABggUAEAMECgAgBggEAFAMAAgQoAgAECFQAAAwQqAAAGCFQAAAwQqAAAGCBQAQAwQKACAGCAQAUAwACBCgCAAQIVAAADBCoAAAYIVACZ5/16ud6fcjKAtwjUv+N5ebne0++vgXNye/hB9INR9Pm4zYufwuN29Xt5nXbTnu/Dd/1W9WGfv/e4uT283OSM0uvYve+C58OvK98pxT5uiWUvuBNy+uHbznE9W3h8tyIz0wvnfefj/AjUv2MjUD/iW8upx+Zq/nZg/sBOYdPkk0B1bd4cab+ex8NdoT7uaYGd9nEzUFWWgTrZ8Sx4w21evVc4AwL179gI1OJq6XmPl3WX6zVekmbDXxgano/YbmqVDxevv8f99NtrjWkRP8zdp6WmSf6i4ekG7rCOMOCFTb1mudW/ri2nGb6itUFRFONb5UO2WNC1D7NeS6TpfkKov1wqlZpPj2ETxvC5dZlgeX/Gq6XVPv/scmruZBGo+X75tZfRNTXLd1/sS7zl684WtwMiUFuP+wdcVxRt5yvUEPPTuuP+vusfubpw2Z0S1a3cTZl3qnZy/qQDdy22mk6PfGo8nEUnuMa+7cSXtDxAXn7WladPXKerY14Ax0Og/h2fBqp/VSf+FbwM1KzJJI0M5eWB2MZsai8vUnwFcuo0Y160PqJkbR23mxuBOs8o54rpc6fIosL0FDZ+71JtIQbcz4sLJp98c58vG1T3MbNYwi01zanVKQO11uYn7UsI1HljaR+9ctn3x/0DMgGXgVq6Zi0rlqvzS1XOrhhQlZNTNp1PhXJqfQ1+nljJ1FLuzzLmp4nuhA9rFgt81qX4HQTq35G/YjMiUJ/uOmz627uMoPKWb/kXdPFrWqmfU26jMsS+/qZ/XRi4Zn52GHL85sMM/3eAq60Y7J1aMWHcCQvLJYLXpkNUx6X91uJs1xVZxb7UfJEsbLJhPA6aaXKtP+c+DyNxdqG8La4+XpL637JbvosulV3kiX2ZWmWhkC6l80CtdXVx3NMc/+viaFctE1AG6nw+ZQd3TS3bwtp8p6SW7rf6yZlv6DXX3VoI5cwZGDbkLvrzNcQZvlnaSvLuAOU7PfVkucUPexW/gED9Oz4L1LxZeU/Pt/arytqL3+XHScptiCvF6U5n2lpsGPLCt4jZ4cqoB2q1mLAht/BiiVdIVLY78e1jK5cKaYysLZKHTRrswg6EmwHZ8J7f8c3KLsb/63wfck0cxkPNZb4ujnJlvK7vi5+Vz/CTs32sdnVx3OOcSoqsW8aEDNS5vspZJGU9noSilzP8rMVqwzrkdmqr9idM2TXFOex+nDs/XzLOkR07Hy//V12hcj7jIAjUv0MOedm4LF/P0xtl6S/oON239rPfDqxpVrmNbMyKY5P/LQvO/QO1WE+RNb59bDcHal5qPr0cdt2+38Q7dn5O1p8r4fSTLpcXSwuh4+KhnAO1XGXedflOxqXD7qc2wbSSaWZaONtHWfPyuKfVzNt+z63GOFDrmy6P42yx2nB2yu2sr7rsmpVAXT1AsmNFoFa3iAOqnFsYlBzywrhcez1HT5cC4eXsW/sZ5RVP8WtaqZ9TbiMbs2IO+N98LdkQ+nmgVovZvOWbL1Duum+f2qVNu+nFrWC/iBh2/eLuP3Kbju9PX9tqn7uVbA2hc4I64bf45mhaMuvS5QGadz+1CWETA9X9OrXK97HW1ZXTIz/uH1jGlAzU+XzKDu6a5eqS/NTKyZNTbGj6RJS/uSA6YPZRoH52gMqdXvzFgwOrnFsY1GeB6l7LV39n0n+6MI4S/uUfFg5vtU6z/GBUZlJYbRr64zYqV6h+Q9lSxWCUraAY/QuLYtLi7sfFEln7rBPm9rGdvEL1peaLiEAN2843uezPxdVeXMTvo9voouRC7Fa/Hv/zJV6hhmWLLi2G+1Dk60yo7cvdf21m7VO+i64Wx92XlB/3DywTUAbqNNut2v+StaxYri6JSRXKTFuRJ2ds6j/HG8+pabvZ5OIN/neBuuiy8gDllYne84tPc3y/bp8b+FVvTk0M5LNAdcNhuveYf6Vk/p5GGI7yr0/kr/GQG1cXI+U2Vt5Dvd5iEN6+CdT1YtzClSXSm4jTR02y8de3j61q76G6KxXXbJpRhM20RBgW0wQv78/4Jupqn2df0NgQw/B6TeOvnx63lHdpMX1tX/xaQ7OsDLGPa129dtw/sExAGaiPWHP+LvSa5eoKz0fs6XkfayfnZP7aTDYvfZar/pb4pDiH02e9/F9V/ufFASqaueXng5Jv0U/DMRGo2JcbBpYj1aCKgfCcpmHe4IBZHfcYqH/LtNcWvYfOCFQY839lZ/7IwBAvFN/dkPzUvD7hzbcwf4ssM7/AXPj8lKgH6spqT3yyLfborDvytxm9+IHE3b6Md9U+fO7PAPyION3vlHO+sxhho4MGanHbOh33lb34PC3+SqBOT1DK3xng1u4pEagAABggUAEAMECgAgBggEAFAMAAgQoAgAECFQAAAwQqAAAGCFQAAAwQqAAAGCBQAQAwQKACAGCAQAUAwACBCgCAAQIVAAADBCoAAAYIVAAADBCoAAAYIFABADBAoAIAYIBABQDAAIEKAIABAhUAAAMEKgAABghUAAAMEKgAABj4K4F6sSBXCgBA9FdC4p8agQoA2PBXQkLGYzsCFQCw4a+EhIzHdgQqAGDDXwkJGY/tCFQAwIaDhkT5YaBANmoh47GdsgAAwNhOExLKPJPx2E5ZAABgbKcJCWWeyXhspywAADC204SEMs9kPLZTFgAAGNtpQkKZZzIe2ykLAACM7TQhocwzGY/tlAUAAMZ2mpBQ5pmMx3bKAgAAYztNSCjzTMZjO2UBAICxnSYklHkm47GdsgAAwNhOExLKPJPx2E5ZAABgbKcJCWWeyXhspywAADC2HiFxudwer/973q8X73p/yjZvKfNMxmM7ZQEAgLHtHhKP22VK05+f65yjr2k+Yxso80zGYztlAQCAse0dElN2uh+exWWpi9T51w8o80zGYztlAQCAse0eEq/o9D/k16TT3d/rPf36CWWeyXhspywAADC2DiHx8Pd3XYa6i9Tp8rT5bVRlnsl4bKcsAAAwttOEhDLPZDy2UxYAABjbaUJCmWcyHtspCwAAjG33kHjer/L27nTLt/merzLPZDy2UxYAABjb3iExffxITuNDSQCA4ewdEulrMyW+NgMAGMvuIfG6GJXPcOCWLwBgOD1CYsrPXGuWOso8k/HYTlkAAGBspwkJZZ7JeGynLAAAMLaOIfHNE3xnyjyT8dhOWQAAYGwdQ4JABQCMq0dIzP9uW/D+TdSyfSAbtZDx2E5ZAABgbB1DgitUAMC4OoYEgQoAGNdpQkKZZzIe2ykLAACM7TQhocwzGY/tlAUAAMbWKyQet/szPcL3m38QVZlnMh7bKQsAAIytT0iER+SnZ+K7z/3yLF8AwDj6hER4RP78j8zwcHwAwFh6hUR2y9d/LbX1877KPJPx2E5ZAABgbNWQeFza3+N8K3tE/jfrVuaZjMd2ygIAAGOrh0R6ttE30bcPZZ7JeGynLAAAMLb3IZHCtfEe7cwvnj+CsPV+7w+BCgA4tq2QCOkXguT53eXqK0X9UlmQ8rUZAMBoqiHxaM+7NeHzvT9TImbXpXzKFwAwlr1DInwD9WdKxDmk5+/PfEyZZzIe2ykLAACMrR4S/p5s/Kne5kO1W77h6zN5s7eUZch4bKcsAAAwtmpIPMSHhr76FJExZZ7JeGynLAAAMLZqSDzF5SOB+o9ABQBsqofEfHf2x92gbbw9uwdlnsl4bKcsAAAwttOEhDLPZDy2UxYAABjbaUJCmWcyHtspCwAAjK0eEkd401RQ5pmMx3bKAgAAY6uGxOMIb5oKyjyT8dhOWQAAYGzVkJBfmzkCZZ7JeGynLAAAMLZ6SBSf8j0GZZ7JeGynLAAAMLZqSEz/Hmrp9+NVmWcyHtspCwAAjO2gISED3ZGNWsh4bKcsAAAwtrWQcM/wdZ9Nev0kZ/4GZZ7JeGynLAAAMLZ6SPgsjQ+wP8SHfpV5JuOxnbIAAMDYqiERPuWb/kUY3kP9R6ACADZVQyI8HH8O1ANcoirzTMZjO2UBAICx1UMiv+X7vF9///qUQAUAHNtpQkKZZzIe2ykLAACM7TQhocwzGY/tlAUAAMb2QUgc40GEyjyT8dhOWQAAYGwfhcQBPuRLoAIADu2jkOBrM/8IVADApk9C4qHJ08ft4he+zl++mR7D1LpKZZ7JeGynLAAAMLZqSMiH4yu+hDplp/8pj9DnfYrX9OsnlHkm47GdsgAAwNj2DokUqOFhEdnk2/zrB5R5JuOxnbIAAMDYqiEhr1Cj1tu03sMv6C5K/bOBb+G5+y0uujyT8dhOWQAAYGz1kMjD0+BJSe6frlHmsjLPZDy2UxYAABhbNSQe4vLxyww0pcwzGY/tlAUAAMZWDYmnyM/2G7SF+7W4QP0unpV5JuOxnbIAAMDY6iGRv8f5vKvi9LW4XH7+x8sbKPNMxmM7ZQEAgLHtHRLz12YKfMoXADCWvUNi+sapnMb3UAEAw6mHRP7vob4uJ1tvzwrlZ3zb7/Y6yjyT8dhOWQAAYGzVkAgPYUjJ993HiGwp80zGYztlAQCAsVVDIvyDbQRqTlkAAGBs9ZDIb/kaPNjB++aR+DNlnsl4bKcsAAAwtrWQyB9udJUzv0OgAgDG1SMkps/0Ft5/KqlsH8hGLWQ8tlMWAAAYWzUkwnuoxrhCBQCMqx4SmuRbRaACAMZ1mpBQ5pmMx3bKAgAAY+sXEuFTTtf760r1/ZuoC8o8k/HYTlkAAGBsRUio7slue9xeGRqfOPjNvzCuzDMZj+2UBQAAxrYWqPVn8H4rPCJ/foQvD8cHAIylT6CGtaVA9ZeostUmZZ7JeGynLAAAMLY+gVrc8vVfS229t6zMMxmP7ZQFAADG1itQ1ZR5JuOxnbIAAP25T0JqyZUCK2Sgrmi9nrR30Z3WMh7bKQsA0N/rZStfye3kSoEVe4dE/kxggQ8lAdjXhUBFR/uHxONWfEPmef/ualeZZ/Il0k5ZAID+CFT01CMkpovU9JleAhVALwQqeuoXEi5Vp0/6EqgA+iBQ0VPHkIj/ihuBCqAPAhU9nSYklHkmXyLtlAUA6I9ARU+nCQllnsmXSDtlAQD6I1DR02lCQpln8iXSTlkAgP4IVPR0mpBQ5pl8ibRTFgCgPwIVPZ0mJJR5Jl8i7ZQFAOiPQEVPpwkJZZ7Jl0g7ZQEA+iNQ0dNpQkKZZ/Il0k5ZAID+CFT0dJqQUOaZfIm0UxYAoD8CFT2dJiSUeSZfIu2UBQDoj0BFT6cJCWWeyZdIO2UBAPojUNHTQUPiUiMbtZAvkXbKAgD0dyFQ0dFpQkKZZ/Il0k5ZAID+CFT0dJqQUOaZfIm0UxYAoD8CFT2dJiSUeSZfIu2UBQDozyRQw3tOOrIyjOg0h1l5RsqXSDtlAQD6u1gEqh6jxx9xmsOsPCPlCd5OWQCA/ghU9HSaw6w8I+UJ3k5ZAID+CFT0dJrDrDwj5QneTlkAgP4IVPR0msOsPCPlCd5OWQCA/ghU9HSaw6w8I+UJ3k5ZAID+CFT01OMw36+X0u0hm7ynPCPlCd5OWQCA/i4EKjra+zA/X2kqp/mp17ucukl5RsoTvJ2yAAD9Eajoae/D/LhVz6Rp8k1O3KQ8I+UJ3k5ZAID+jhOoJuTu4WD2PkJcoQL4NZfDBKqc1I4h6Ph6HKFb8TfW5RWlT9nkPeXJJM/NdsoCAPR3sUgyPZMyGIKO7zRHSHkyyXOznbIAAP2ZJJmeSRkMQcd3miOkPJnkudlOWQCAVv6WlpJ8Jf8GkzIuDEGHt/sRet6v8hbv9Imk5vu+ypNJnpvtlAUAaKXPIf0aTJiUMf+NoCC7GKb27l8+lATgSxd1DunXYMKkDJOVyC6Gqb1DgkAF8CV9hOjXYMKkDJOVyC6Gqd1D4pWd8sFI3PIFDuxyJPJ12Ei/BhMmZVitRE+eMYh6dA1fmwFO5GIxcJvQV6JfgwmTMkxWosdIuOE0XaM8ivKkaKcsADiLgwzc/ywiRL8GEyZlmKxE73IY8sQ9gI41uccNfvFYfE/ZffKkaKcsADiLyzEG7n8WEaJfgwmTMkxWoneQMv4d8v3gjiFBoAL7i3++q8iz/5foK9GvwYRJGSYr0TtIGf/+bKBOn+ktvH8TtWwfyEYt5LoAAGcmR/kD6FiT7goVAIAjI1ABADDQMVABABgXgQoAgIFegfq43Z/piYPTzd/3H0wCAOA8+gRqeKJveoSv+9zvTbbak/x8GADgK3J4RdSna2Sg+ktU2QoATDH6m6NLN/TqmuyWr/9aKp/3BbA3Rn9zdOmGfl2TPSKf908B9MDob44u3UDXABgWo785unRDj66RTx7kdi+ALhj9zdGlG3bvmuf9Ku/wfvUPjANAK0Z/c3Tphr27ZgpPOe0nPIZQTgQA4LRqaWcpfGGmMpWvzQAABlJJO3PZ53sd7vYCAIbTI1ABABgegQoAgAECFQAAAwQqAAAGCFQAAAwQqAAAGCBQAQAwMHqgun827md6XBbffjU0PemKBzIbeaaTc/qWNg+6tuD+jUjXle7fXpaz8TX34Fgey7Nm7ECdn9PknnXIUGXBv6IIVCvPezoxfQwUc/GVKUXDX9D1h7XhO+HFT6CuGPpUc+NT9iOJaiA86upBZ+6Ayyl7BKql14v/7v5akTPgDH2q5cOT+5m7vmYI1B3wXE5j/MNWlsKfJn4olTPhEKj4CoFq7nWK0qn2phjgda+X/kUTAnXD0IHKLd/9EKh23MnJn3u7yd6lxtf8m6cJXVo1dKDyoaT9EKh2GJ7MFX8+c66a4gp1w9iBOh18vjazCwYpK6+/+jg1rWXv8PChJGME6gZONQAADBCoAAAYIFABADBAoAIAYIBABQDAAIEKAIABAhUAAAMEKgAABghUAAAMEKgAABggUAEAMECgAgBggEAFAMAAgQoAgAECFQAAAwQqAAAGCFQAAAwQqAAAGCBQAQAwQKACB3W73p9yGoDjIlDxlz1uDzmp5sNmC4/b5bKeio+bnJKZFnXi8t/WEDzC6jIPtxHZcFOqKtDV9MbjtuvqAXNtLydgLMqUemcrUNfD7Hm/uqjyV6ivdm4FRqU+7yv1fCQWM/+uWdumqX9sdhnoZeUlDZxKunJKQ7AbjsNlWZqYrqzm5dxlWvz1xze9xmZxwRhmLurKWRWp1f0+B2pRYWoRI3OeFZdPgRrNgRpaZ3kc13B9bfFNwhWBGkN92uLVl7SW/54M1OddVJUWv7liLtN18Dz3EmsuO8C3L45X6mc/O/5W3+XXf/3EZTOgJ848jCDlWxqi3Xg7jbNu7J5+SMH5mhKHcZdSc1Q9fdrlIeF+Di18zvnl4qyKNCeM+E/X3E1LxcxhVinerf16rwfqfCP0EYuby3z9tBmIG4EaqtjYr59loMYr1NSl0+65n/wu+MZ5h/uf0ryifXG8Up9VDpzY5bTgcntATwQqBpLlXBqO8+gSbVJKpbTzw/UiU0IzN3hvxI2T35qdtpWN7WH098WUVcW5+dpD69T+EdImNfApWCz09h7seqBm01bzKO5BkOVbuEZM2Tz3f1nzJC9y2T5UNQdqkPWP2OVp63kN+Z8+QEcEKkYQR/hbGkkXA7Qfut2YPF+DxkB1bR/xSijd2BXN5nWsj9evFmKsf4VHvumYLnOghjVmxXvpPVQ3rRKofh9FuqxlYbAaqDGN3gVqZY6IWVdQGahz1L1vH6qaA3V54MQux0CV6wQ6I1BxftlFYRpJ5QDtxufQKLtr6n+Yhvzr63/30CCKK8mvOr15uJeyO8YuCaZwKmspA3VZfIy0cMs3ZKRvN60yNg83TvMYfr692bkaqGG1m3k6za3NiuvJyP4vLPtz2T72cO3AiV1Ot4jDJOCXcAri/LIrzkuMAzlAl5eGMTLCyO6vgdINzJQncVq6kJ2X24idNMtdKeWZ5+JUBGqleNcsvIeacmL391BTzcu0Sx71QJ2DPJT+zPs/j/mnn5p19rK9ryp2ce3AiV12gVr8MbFxdID9EKgYgRtVp4F1fYAOqennziOzb+NuS2bDcRCnzGEW52yN13FD86d8802/1jFniVtNWqcvvlxH2o35qi7OmF+8sa7bo3LtV1oP1HhfNc2tWAvUn7mqsIKs//O5oebl7i2Pl9+pZ/3AFbt8iZewcZ3ho8VAZwQqMA3ZWwl5bNn9zxiQrearwHMQu3zeY4fBnOlVBOzief9ySH4tKH23Ip35utnFTHb1lyk/FiQsA/Ugu7ZG7DJwDAQqAAAGCFQAAAwQqAAAGCBQAQAwQKACAGCAQAUAwACBCgCAAQIVAAADBCoAAAYIVAAADBCoAAAYIFABADBAoAIAYIBABQDAAIEKAICB/4b5VBOsOTwBAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,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>

[image3]: <data:image/png;base64,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>

[image4]: <data:image/png;base64,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>

[image5]: <data:image/png;base64,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>

[image6]: <data:image/png;base64,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>

[image7]: <data:image/png;base64,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>

[image8]: <data:image/png;base64,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>

[image9]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnAAAADMCAIAAAB85gnTAAATjUlEQVR4Xu3cQXqqShPGcfd0Z+7BbTh0KT7ZR+auIXtw6uwsIldowLJBghS0zdv/3/N9JxFFKK3iTZtz7u4XAAC47eINAADgfQQqAAALIFABAFgAgQoAwAKWDNTr1363231dm5vH3TJPfn/W9ikbx+o4je5wD9fLyAPCSXaOl2rbbv/19KDa/ZHVnSMux+4pAvvM9zvMQ1+JD30/O3vzlf5rErmfWv31ak9ofJdxfx2xel3D14F3BAAKMOnyPVGdVVXGhJuPQL1eqsv5PgTM9Z5A4ZH3/1+rTNpXm+twCpfiemO9Q31tji7l93335ppdPe75Eh5t6c4niGKyjr021cJ57naXau8misxjo0Ka+Ow9WyMqf9/u1T5zXbUJ1Crn7xXXsVS9PM326uWqvjSvye75Nbl+1T87HOszNtq9vuwrcXl+qublffEuXO57NqdU3+7ehfDDSldOeLbLtQ3U6glDaQBQluUD9f5HuAR3idItCevt9wjZ11fqOjXC9ku7bKyv+O3DK7+9QL3ftBlWXc6fFnnXpzVj/YAoj3sR2KSaWbru29h7en2eCxkN1Gu1e/g2Kr8t9Wlx3G09vgjU9jkq4QHX8DCz8eGes+G07mv13oLxsU+914t34bI/NhEesrZ5F65f7canF+Geu+HMwyO7YwFAOZa89oVA/W0XhU2g3i/BbcC1QdXc3jcxcGlXlI/l2qW9uP/2AvWx8qvVCyT74WqzDnvcPj5lXvSRb5vxX/Y877vct8cf+T4XUu14OT4fymbVvjlns0iszrP5oaP7CaA5dPtSNK9JP1B/69fkqw658IBrs6jd31eH4QGd+/l3m67XS1vwY+FoX94X70J1s3lw/QJ2R2yfoy2n2elRwvOyGABKsUqgVtmz/+oCtUudJlDb6+3jUt4FVbiU33Pu63Kts/K3F6hf/RVq8xlySIiBFaq51YvJeltItcdul+pzzviRz4W8CNTHp8HNObcf1daaSGt/xdsujuvHhLvC8q4XqM1rcrlco9fkemmWjOZEqhdjKNHapHx+eV++C+3NEJDhOZs6GnvzClQHDd/1XxYAKME6gdp+Ghk2h2+qe6sr9V+B2i4EQ+pce4EanrD6pWH43WRvNRQO/eoBcUzW25oTa1MtHLe30noqpLqnlxxmrXxpv782OVqdzDFkZ/2sYXsTcsf6p4LuECGFf0Mt92N0i+O6ou41qaurtl+eT7Vbod6/2R+bhWb1y86hl3f4Xahz91o/c3cm4bhVFtdPVxd4CdWZt7v/ugFAEdYK1N/6ct/dUV1uu7+UNB6o7bX+fuG2HzY+u9a/ht0dv57+ltCrB9i/svM6UNvzfDy+CRXzQFvIeKBWp93c2+zVfeLa/KWkJlbbT1arqtu/lFTvFKK3+ci3WdTuj8+vSfOXkvbReZjF9KV+nvox5kDm5X3xLlQ3wxmFV6N7F9ozacoJS+Qq8/kdKoCyce3T1CyL54t/FT3d7B0BYNMIVE2X5t+hzjY3UPl3qABK5bzsAgCACoEKAMAC3gzU2/dP/fV8qNyiewEAKNUbgfpzPnz/hED9CbF6OpztA/7N5dkXmEGs5cTKARLzTJANwTcCtRJWqD/nsDY9H072zvg4k3n2BWYQazmxcoDE3p2g390u/K/63pgVqKxQsXFiLSdWDpDYxAkKCRpvNOYF6u30Xa1RD+cQrI34OJN59gVmEGs5sXKAxMYnyK5H+2wIvhmoo+LjTObZF5hBrOXEygESG5ygVwkasSFIoKJEYi0nVg6QWJig8ZXoKzYECVSUSKzlxMoBUpoRopYNQQIVJRJrObFygLVFCeqZIBuCBCpKJNZyYuUAixv/ONczQTYECVSUSKzlxMoBlvUqRzueCbIhSKCiRGItJ1YO4DeyHu3zTJANQQIVJRJrObFygHneClHLM0E2BAlUlEis5cTKAaabHaKWZ4JsCBKoKJFYy4mVA4xbJEQtzwTZECRQUSKxlhMrB+hbPEQtzwTZECRQUSKxlhMrBwhWDVHLM0E2BAlUlEis5cTKAZJFaeCZIBuCBCpKJNZyYuWgTIlD1PJMkA1BAhUlEms5sXJQjg+GqOWZIBuCBCpKJNZyYuVAWyYhankmyIYggYoSibWcWDnQk2GIWp4JsiG4ZKACANAI/z36kixZbRzck3n2BWYQazmxcrB1ma9H+zwTZEOQQEWJxFpOrBxs0eZC1PJMkA1BAhUlEms5sXKwFZsOUcszQTYECVSUSKzlxMpBzmRC1PJMkA1BAhUlEms5sXKQG8kQtTwTZEOQQEWJxFpOrBzkQD5ELc8E2RAkUFEisZYTKwefUlSIWp4JsiFIoKJEYi0nVg7SKzZKA88E2RAkUFEisZYTKwdphBAtOUc7ngmyIUigokRiLSdWDlZFgvZ5JsiGIIGKEom1nFg5WBbL0D95JsiGIIGKEom1nFg58OPj3Ld4JsiGIIGKEom1nFg5mI0EncczQTYECVSUSKzlxMrBdCxDF+GZIBuCBCpKJNZyYuVgIqJ0KZ4JsiFIoKJEYi0nVg5e4TejK/FMkA1BAhUlEms5sXIQIUTX5pkgG4IEKkok1nJi5eBfHaLxJqzGM0E2BGcG6vkn3vLrO6F4E7AmsZYTK6dMfJz7QZ4JsiE4L1B/DrUuVv+rPT0EAPCnkKOQMOuNvH1/36qv36eT3RwH92SefYEZxFpOrJwSsB7NimeCbAjOCtTWz/lgb8bHmcyzLzCDWMuJlSOMEM2TZ4JsCM4M1PCRb1induLjTObZF5hBrOXEyhFDiObPM0E2BGcG6qD4OJN59gVmEGs5sXIEEKLb4pkgG4IEKkok1nJi5WwUIbpdngmyIUigokRiLSdWzoYQoho8E2RDkEBFicRaTqyczBGiejwTZEOQQEWJxFpOrJxsEaWqPBNkQ5BARYnEWk6snKwQoiXwTJANQQIVJRJrObFyPo4QLY1ngmwIEqgokVjLiZXzEYRoyTwTZEOQQEWJxFpOrJxkCFEEngmyIUigokRiLSdWzqoIUfR5JsiGIIGKEom1nFg5KyFK8YpngmwIEqgokVjLiZWzIEJ0u3a1eGtt5K5xr3b0TJANQQIVJRJrObFynAjRVYVMssLGkbtGNkbP2T9Kt8UauWvcqx09E2RDkEBFicRaTqycGQjRt3RxtbbBY9mN0fn0T9Ju6YzcNe7Vjp4JsiFIoKJEYi0nVs5EZYZoiISshLOKzi0+77x5JsiGIIGKEom1nFg5I8RC1CZQhuLT1eWZIBuCSwYqAKxit5krVRxKCcWnguSWfA/i4J7Msy8wg1jLiZXTCevR3JakcY4lF58Q3DwTZEOQQEWJxFpOrZy0mRHnVXLxCSE5zwTZECRQUSKxltt6OYsvQ+PISi4+IeTNM0E2BAlUlEis5bZYzvSPc+OwSis+GyjyTJANQQIVJRJruQ2V0yVoHFwJPZ8R4JogG4IEKkok1nL5lBNnV7sMXUl8eGAWzwTZECRQUSKxllu7nDjHJvDkaHx4YGWeCbIhSKCiRGItt3g5ccRN1v1mdKL4wMAneCbIhiCBihKJtdzscuJ8m8uGaHwMIHuzJ+gfgQqItdzEcmwEzhA925S/oAtswsQJGmRDkEBFicRabrycOBhHxTsb0/+hC7At4xM0zoYggYoSibXcq3LitDTih75GiELeqwmawoYggYoSibXcYDlxhL4TiiQoijI4QRPZECRQUSKxluuXE2fp5IBkPYoC9SdoOhuCBCpKJNZyUTnvRikhisJ5Lgg2BAlUlEis5aJypkQpIQp0PBcEG4IEKkok1nK2nJE0JUSBQZ4Lgg1BAhUlEms5W04UqIQo8CfPBcGG4HCgXo7VQF7jzQ/nQ+X2vDE+zmSefYEZxFrOlrPjX4sCb/JcEGwIDgdq61r/pHuMN//+/NRfToez3RofZzLPvsAMYi1XjV8botEKFcCfPBcEG4IvA/X6ta9+1K1Xq/FS9fYd1qbnwyls+K9mHgEglbAkfdyqmLsBJDI4eJehVanRC9QgDu7JPPsCM2y95aIPdW05LE+Bd3kuCDYEBwP1T7dTHamHc/jotxEfZzLPvsAMW2y5kd+M2nIIVOBdnguCDcF5gTosPs5knn2BGbbSciMhatlyCFTgXZ4Lgg1BAhUlyrnlJoaoZcshUIF3eS4INgQJVJQot5abEaJWKCdEKYEKvMtzQbAhSKCiRPm0nDNKg9/2L/cSqMAMnguCDUECFSX6bMstEqL/ev8RfCt+KIDXPBcEG4IEKkqUvuU8IRqn5ah4ZwB/8VwQbAgSqChRmpabGKJxJL4vTTmAKs8E2RAkUFGi9VquH6Jx+i3BPv+/NcsBSuCZIBuCBCpKNNhycWpNFkJ0cfH5vTZYDoCJPBNkQ5BAxbbFKZSKP0TjShyYIMDDM0E2BAlUZC1OoQzMi9K4sEUxQYCHZ4JsCBKoGBYHQhniV6HV/81oVpggwMMzQTYE8w3U8QvciPEd+/dGW+zNaHt3b/eYwe+RWPceTTfYcpHMQ9SaUg6AVzwTZEMw90Cdcbkc37F/l91i9x38Houwr/9HDLbcv02FqPWqHABTeCbIhmDugRpvnWB8x/690RZ7M9re3ds9ZvD7KbqnxUfYlttoiFqDEwRgIs8E2RDMN1CB9VT9uvEQtZggwMMzQTYECVSUJaxHldL0HxME+HgmyIbgkoEK5Kv+7/MBwHqWvMrEwT2ZZ19g0PgyVKzlxMoBEvNMkA1BAhU6pn+cK9ZyYuUAiXkmyIYggYrNm5KgEbGWEysHSMwzQTYECVRs0owQtcRaTqwcIDHPBNkQJFCxGRM/zp1CrOXEygES80yQDUECFRuwYJQGYi0nVg6QmGeCbAgSqMjU4iFqibWcWDlAYp4JsiFIoCIjq4aoJdZyYuUAiXkmyIYggYoPSxailljLiZUDJOaZIBuCBCo+4CMhaom1nFg5QGKeCbIhSKAikY+HqCXWcmLlAIl5JsiGIIGKFWUVopZYy4mVAyTmmSAbggQqVpFtlAZiLSdWDpCYZ4JsCBKoWEzmIWqJtZxYOUBingmyIUigwmVDIWqJtZxYOUBingmyIUig4m0bDVFLrOXEygES80yQDUECFZMIhKgl1nJi5QCJeSbIhiCBipfEQtQSazmxcoDEPBNkQ3BmoB4aZ7sxPs5knn2xBuEoDcRaTqwcIDHPBNkQnBeot+9bvOnXd0LxJiQnH6KWWMuJlQMk5pkgG4KzAvX2HQL1+3Sym+PjTObZFx5Fhagl1nJi5QCJeSbIhuCsQG39nA/2ZnycyTz74l3Fhqgl1nJi5QCJeSbIhuDMQA2/QY0++I2PM5lnX0xBiEbEWk6sHCAxzwTZEJwZqIPi40zm2RevEKIjxFpOrBwgMc8E2RAkUKUQohOJtZxYOUBingmyIUigiiBK3yLWcmLlAIl5JsiGIIG6YYTobGItJ1YOkJhngmwIEqgbQ4guQqzlxMoBEvNMkA1BAnUDCNHFibWcWDlAYp4JsiFIoOaLEF2PWMuJlQMk5pkgG4IEakZYiSYj1nJi5QCJeSbIhiCBmguiNCWxlhMrB0jMM0E2BAnUj2E9+kFiLSdWDpCYZ4JsCBKoSYUQJUc/TqzlxMoBEvNMkA1BAjUFEjQ3Yi0nVg6QmGeCbAgSqKtgGZo5sZYTKwdIzDNBNgQJ1CWRo1sh03KBWDlAYp4JsiFIoHqRoFu06ZbrEysHSMwzQTYECdT5WI9u10Zb7hWxcoDEPBNkQ5BAfQ8JqmFDLTeFWDlAYp4JsiFIoP6Bf+giKeeWm0GsHCAxzwTZECRQhxGi2jJsOQ+xcoDEPBNkQ5BAfSBBy5FJyy1FrBwgMc8E2RAsPVBZiZbpgy23BrFygMQ8E2RDsMRAJUSRuOXWJlYOkJhngmwIlhWoRCmCZC2Xhlg5QGKeCbIhqB+ohCj6Vm259MTKARLzTJANQc1AJUQxbvGW+yyxcoDEPBNkQ1AnUAlRTLdIy+VDrBwgMc8E2RDcdqASophndsvlSawcIDHPBNkQ3F6gEqLwe6vl8idWDpCYZ4JsCG4pUIlSLGViy22FWDlAYp4JsiGYe6ASoljDSMttkVg5QGKeCbIhmGOgEqJYm6ddMyRWDpCYZ4JsCOYSqIQoUvK0a4bEygES80yQDcFPBmoXojP2BTzEWk6sHCAxzwTZEEwdqIMr0Yn7AksRazmxcoDEPBNkQzBFoA6GqDWyL7AGsZYTKwdIzDNBNgTXDdQ/ozQY3BdYj1jLiZUDJOaZIBuCywfqxBC1un2BNMRaTqwcIDHPBNkQXDJQZ/vvv//iTQAmY4IAj6UmiEAFNo8JAjyWmqAsAhUAgK0jUAEAWACBCgDAAnIJ1Nv36fwTb0QmzofT/c9T/Scyc7sPzn184s3Ixc/3rfrC+OTscDjEm2bJIlC/T6fvW3VdQM5CrCIvt3C5bq7ayBbjk60qgE7bD9Sf86H6uaC5IhCo2Qlv0KF+Y84L/QSHhRGoG1BNUrwNmagnSCFQnxGo+TpxOcjXrfp4h498s3X75sqWP71ABQBgwwhUAAAWQKACALAAAhUAgAUQqAAALIBABTbs+rX/ut6/XsIXAB9EoALbtt/t97tjvBVAcgQqsG2X4253vMRbASRHoALbdo/Te6TGWwEkxxwCG3Zfnta/O72ySAU+jkAFAGABBCoAAAsgUAEAWACBCgDAAghUAAAW8D9kTeVyKeusEAAAAABJRU5ErkJggg==>

[image10]: <data:image/png;base64,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>

[image11]: <data:image/png;base64,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>