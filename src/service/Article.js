const BASE_URL = 'http://127.0.0.1:3000'
export const ArticleService = {
  getArticles: async () => {
    const response = await fetch(`${BASE_URL}/articles/`);
    const data = await response.json();
    return data;
  },
  getAttributes: async ()=>{
    const response = await fetch(`${BASE_URL}/articles/attributes_description`);
    const data = await response.json();
  return data
  },
  newArticle: async (article) => {
    const response = await fetch(`${BASE_URL}/articles/`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
      }
    );
    const data = await response.json();
    return data;
  },
  updateArticle: async (formData, article) => {
    const response = await fetch(`${BASE_URL}/articles/${article.id}`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
    const data = await response.json();
    return data;
  },
  deleteArticle: async (article) => {
    const response = await fetch(`${BASE_URL}/articles/${article.id}`,
      {
        method: "DELETE"
      }
    );
    const data = await response.json();
    return data;
  },
  predictDemand: async (formData, methods,pmseParams,id,weightings) =>{
    const body = {
      periods_quantity: parseInt(formData.demand_period_count),
      period: formData.demand_period_kind,
      prediction_methods: methods,
      weightings: weightings,
      predicted_demand_for_first_period: parseInt(pmseParams.predicted_demand_for_the_previous_period),
      alpha: parseFloat(pmseParams.alpha)
    }
    console.log(body)
    const demand_prediction = {demand_prediction: body}
    const response = await fetch(`${BASE_URL}/articles/${id}/predict_demand`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(demand_prediction)
      }
    );
    const data = await response.json();
    console.log(data)
    return data;
  },
  getArticleByCode: async(code) =>{
    const response = await fetch(`${BASE_URL}/articles/find_by_code?code=${code}`);
    const data = await response.json();
    return data;
    
  },
  getHistoricalDemand:async(article, filters) =>{
      var response = '';
    if (filters.demand_period_count == ''){
       response = await fetch(`${BASE_URL}/articles/${article.id}/historical_demand`)
    }else{
      response = await fetch(`${BASE_URL}/articles/${article.id}/historical_demand?periods_quantity=${filters.demand_period_count}&period=${filters.demand_period_kind}`);
    }
    const data = await response.json();
    console.log(data)
    return data;
}, 
  addDemandHistorical: async (body) => {
    const historical_demand = {
      historical_demand: body
    }
    console.log(historical_demand)
    const response = await fetch(`${BASE_URL}/historical_demands/`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(historical_demand)
      }
    );
    const data = await response.json();
    return data;
  },
  ArticleProviders: async (article)=>{
    const response = await fetch(`${BASE_URL}/articles/${article.id}/providers`);
    const data = await response.json();
  return data
  },
  cgi: async (article,provider)=>{
    const response = await fetch(`${BASE_URL}/articles/${article.id}/cgi?provider_id=${provider}`);
    const data = await response.json();
  return data
  },
  optimalLot: async (article,provider)=>{
    const response = await fetch(`${BASE_URL}/articles/${article.id}/optimal_lot?provider_id=${provider}`);
    const data = await response.json();
  return data
},
  activePurcharseOrden: async (article)=>{
    const response = await fetch(`${BASE_URL}/articles/${article.id}/active_purchase_orders`);
    const data = await response.json();
  return data
  }
}
